"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignupData, loginData } from "@/types";
import { dwollaClient } from "../dwollaConfig";
import { plaidClient } from "../plaid";
import { generateFakeCard ,generateBanklyAddress} from "../utils";
import { CountryCode, Products } from "plaid";





function handleApiResponse(response: any, errorMessage: string) {
  if (!response) {
    throw new Error(errorMessage);
  }
  return response;
}

// Generate Plaid Link Token
export async function generatePlaidLinkToken(userId: string) {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: "bankly",
      products: ["auth" as Products, "transactions" as Products], // Replace "transactions" with a valid value from the Products type
      country_codes: ["US" as CountryCode,"CA" as CountryCode],
      language: "en",
    });

    const linkToken = handleApiResponse(response.data.link_token, "❌ Error generating Plaid Link Token");
    return linkToken;
  } catch (error) {
    console.error("❌ Error generating Plaid Link Token:", error);
    throw error;
  }
}

// Exchange Plaid Token and Create Dwolla Funding Source
export async function exchangePlaidToken(publicToken: string, userId: string): Promise<string> {
  if (!publicToken || !userId) throw new Error("Missing token or user ID");

  try {
    const { databases } = await createAdminClient();
    


    const userDocs = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("id", userId)]
    );
    const userDoc = userDocs.documents[0];
    const exchange = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });
    const accessToken = exchange.data.access_token;

   

 


      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_USER_COLLECTION_ID!,
        userDoc.$id,
        {
          plaidToken: accessToken
        }
      );
    

    return accessToken;
  } catch (error) {
    console.error('❌ Error exchanging Plaid token and saving Dwolla funding source:', error);
    throw error;
  }
}

// Fetch and Save Transactions to Appwrite
export async function fetchAndLogPlaidTransactions(userId: string) {
  const { databases } = await createAdminClient();

  const userDocs = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    [Query.equal("id", userId)]
  );

  const userDoc = userDocs.documents[0];
  if (!userDoc || !userDoc.plaidToken) {
    throw new Error("User or Plaid access token not found");
  }

  const accessToken = userDoc.plaidToken;

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
      options: {
        count: 100,
        offset: 0,
      },
    });

    const transactions = response.data.transactions;

    return transactions;
  } catch (error) {
    console.error("❌ Error fetching Plaid transactions:", error);
    throw error;
  }
}

export async function saveTransactionsToAppwrite(transactions: any[]) {
  const { databases } = await createAdminClient();
  for (const transaction of transactions) {
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID!,
      ID.unique(),
      {
        accountId: transaction.account_id,
        amount: transaction.amount,
        status: transaction.status,
        authorizedDate: transaction.authorized_date,
        category: transaction.category,
      }
    );
  }
}



// Create a user and save to Appwrite and Dwolla
async function createUserInAppwrite(formData: SignupData) {
  const { account, databases } = await createAdminClient();
  const user = await account.create(
    ID.unique(),
    formData.email,
    formData.password,
    `${formData.firstName} ${formData.lastName}`
  );

  const session = await account.createEmailPasswordSession(formData.email, formData.password);
  const dwollaResponse = await createDwollaCustomer(formData);
  const dwollaUrl = handleApiResponse(dwollaResponse.headers.get("location"), "Failed to create Dwolla customer");

  // Save user data to Appwrite
  await databases.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    ID.unique(),
    {
      id: user.$id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobile: formData.mobile,
      country: formData.country,
      dateOfBirth: formData.dateOfBirth,
      password: formData.password,
      plaidToken: null,
      dwollaUrl,
    }
  );

  return session;
}

// Create a Dwolla customer
async function createDwollaCustomer(formData: SignupData) {
  const requestBody = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    dateOfBirth: formData.dateOfBirth,
    type: "personal",
    address1: "123 Fake Street",
    city: "Fake City",
    state: "CA",
    postalCode: "90210",
    ssn: "1234",
  };

  return await dwollaClient.post("https://api-sandbox.dwolla.com/customers", requestBody);
    
}

export async function savePlaidTokenToUser(userId: string, token: string) {
  const { databases } = await createAdminClient();

  // 🔍 Fetch user document by custom userId
  const userDocs = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    [Query.equal("id", userId)]
  );

  const userDoc = userDocs.documents[0];
  if (!userDoc) throw new Error("User document not found");

  // ✅ Use the correct Appwrite document ID
  await databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    userDoc.$id,
    { plaidToken: token }
  );
  await fetchAndLogPlaidTransactions(userId); // Fetch transactions after saving the token
}


export async function fetchPlaidAccounts(userId: string, accessToken: string) {
  try {
    // Step 1: Get full account details from Plaid
    const res = await plaidClient.accountsGet({ access_token: accessToken })
    const accounts = res.data.accounts
//  console.log('res',accounts);
    // Step 2: Get ACH numbers from Plaid
    // const achRes = await plaidClient.authGet({ access_token: accessToken })
    // const achNumbers = achRes.data.numbers.ach
    // console.log('ACH Numbers:', achNumbers);
    // Step 3: Enrich each account
    const enrichedAccounts = //await Promise.all(
      accounts.map( account => {
        // const routingData = achNumbers.find(n => n.account_id === account.account_id)
        // if (!routingData) return null
        // console.log('Routing Data:', routingData);

        // Create funding source in Dwolla
        // const dwollaRes = await dwollaClient.post(
        //   `https://api-sandbox.dwolla.com/funding-sources`,
        //   {
        //     routingNumber: routingData.routing,
        //     accountNumber: routingData.account,
        //     type: 'checking',
        //     name: account.name,
        //   },
        //   { 'Content-Type': 'application/json' }
        // )
// console.log(dwollaRes);
        // const fundingSourceUrl = dwollaRes.headers.get('location')
        const fakeCard = generateFakeCard(account.mask || '0000')

        return {
          userId,
          accountId: account.account_id,
          accountName: account.name,
          accountOfficialName: account.official_name,
          type: account.type,
          subtype: account.subtype,
          availableBalance: account.balances.available,
          cardNumber: fakeCard.cardNumber,
          expiryDate: fakeCard.expiry,
          // fundingSourceUrl,
        }
      })
    

    // Filter out any failed accounts
    return enrichedAccounts
  } catch (error) {
    console.error('❌ Error in fetchPlaidAccountsWithFundingSources:', error)
    throw error
  }
}

export async function saveBankAccountsToAppwrite(accounts: any[], userId: string) {
  const { databases } = await createAdminClient();

  for (const account of accounts) {
    // 🔍 Check for existing account with same accountId and userId
    const existing = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      [
        Query.equal('userId', userId),
        Query.equal('accountId', account.accountId),
      ]
    );

    if (existing.total > 0) {
      console.log(`⚠️ Account with ID ${account.accountId} for user ${userId} already exists. Skipping...`);
      continue;
    }

    // ✅ If no duplicate, create the document
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      ID.unique(),
      {
        userId: userId,
        accountId: account.accountId,
        accountName: account.accountName,
        accountOfficialName: account.accountOfficialName,
        type: account.type,
        subtype: account.subtype,
        availableBalance: account.availableBalance,
        cardNumber: account.cardNumber,
        expiryDate: account.expiryDate,
        dwollaFundingsource: account.fundingSourceUrl || null,
        banklyAddress: generateBanklyAddress() || null,
      }
    );

    console.log(`✅ Account ${account.accountId} saved for user ${userId}`);
  }
}
export async function fetchTransactionsFromAppwrite(accountId: string) {
  const { databases } = await createAdminClient();


 
    const transactions = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID!,
      [Query.equal("accountId", accountId)]
    );
   
  

  return  transactions;
}




// Handle signup process
export async function signupUser(formData: SignupData) {
  try {
    const session = await createUserInAppwrite(formData);

    // Set session cookie
    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    redirect("/sign-in");
  } catch (error) {
    console.error('❌ Signup error:', error);
    throw error;
  }
}

// Login user and handle Plaid token
export async function loginUser(formData: loginData) {
  try {
    const { account, databases } = await createAdminClient();
    const session = await account.createEmailPasswordSession(formData.email, formData.password);

    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    

    redirect("/");
  } catch (error) {
    console.error("❌ Login error:", error);
    throw error;
  }
}

// Get user document by email
async function getUserDocument(email: string) {
  const { databases } = await createAdminClient();
  const userDocs = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    [Query.equal("email", email)]
  );

  const userDoc = userDocs.documents[0];
  if (!userDoc) throw new Error("User document not found");
  return userDoc;
}


// Get the logged-in user's document
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const { databases } = await createAdminClient();
    const user = await account.get();
    if (!user) throw new Error("User not found");

    const userDocs = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("id", user.$id)]
    );
  console.log('sa',userDocs.documents[0]);
    return userDocs.documents[0];
  } catch (error) {
    console.error("❌ Error fetching logged-in user:", error);
    return null;
  }
}

// Log out user
export async function logOutUser() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    cookies().delete("my-custom-session");
    redirect("/sign-in");
  } catch (error) {
    console.error("❌ Logout error:", error);
    throw error;
  }
}

export async function isUserLinkedToBankAccount(userId: string) {
  try {
    const { databases } = await createAdminClient();

    // **Check if the user has any linked accounts in the Appwrite `accounts` table**
    const userAccounts = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!, // Table for linked accounts
      [Query.equal("userId", userId)]
    );

    return userAccounts.documents.length > 0; // ✅ Returns `true` if user has at least one linked bank account
  } catch (error) {
    console.error("❌ Error checking linked bank account:", error);
    return false; // ❌ Returns `false` if an error occurs
  }
}



export async function getUserBankAccounts(userId: string) {
   console.log(userId);
    const { databases } = await createAdminClient();
    const accountDocs = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
   console.log(accountDocs.documents);
    if (!accountDocs) throw new Error("User document not found");
    return accountDocs;

}
export const updateUserBankAddress = async ({
  accountId,
  newAddress,
}: {
  accountId: string;
  newAddress: string;
}) => {
  try {
    console.log('sa');
    const { databases } = await createAdminClient();
    const updated = await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      accountId,
      { banklyAddress: newAddress }
    );
console.log(updated);
    return updated;
    
  } catch (error) {
    console.error('Failed to update banklyAddress:', error);
    throw error;
  }
};

export const deleteUserBankAccount = async (accountId: string) => {
  try {
    const { databases } = await createAdminClient();
    
    const deleted = await databases.deleteDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      accountId
    );

    console.log('Deleted account:', accountId);
    return deleted;
  } catch (error) {
    console.error('Failed to delete bank account:', error);
    throw error;
  }
};

export const updateUserDefaultAccount = async (
  userId: string,
  defaultAccountId: string
) => {
  try {
    const { databases } = await createAdminClient();

    const updatedUser = await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!, // replace with your actual users collection ID
      userId,
      {
        defaultAccountId: defaultAccountId,
      }
    );

  
    // Redirect to the desired page after updating
    return updatedUser;
  } catch (error) {
    console.error('Failed to update default account:', error);
    throw error;
  }
};
