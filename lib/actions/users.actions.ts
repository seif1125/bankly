"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Account, SignupData, Transaction, loginData } from "@/types";
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

 
export async function generatePlaidLinkToken(userId: string) {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: "bankly",
      products: ["auth" as Products, "transactions" as Products],  
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
        userId,
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

 
export async function fetchAndLogPlaidTransactions(userId: string) {
  const { databases } = await createAdminClient();

  const userDocs = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    [Query.equal("id", userId)]
  );

const userDoc = userDocs.documents[0];
  if (!userDoc) throw new Error("User document not found");
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

export async function savePlaidTransactionsToAppwrite(transactions: Transaction[],userId: string) {
  const { databases } = await createAdminClient();
  for (const transaction of transactions) {

    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID!,
      ID.unique(),
      {
        senderUserId: transaction.amount>0?userId:transaction.merchant_entity_id||'anonymous',
        senderAccountId: transaction.amount>0?transaction.account_id:transaction.merchant_entity_id||'anonymous',        
        amount: transaction.amount,
        status: transaction.pending? "pending" : "successfull",
        authorizedDate: new Date(transaction.authorized_date),
        category: transaction.category,
        merchantName: transaction.name,
        transactionId: transaction.transaction_id,
        receiverUserId: transaction.amount<=0?userId:transaction.merchant_entity_id||'anonymous',
        receiverAccountId: transaction.amount<=0?transaction.account_id:transaction.merchant_entity_id||'anonymous',  
        banklyTransfer:false
      } 
    );
  }
}



 
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

  return 'dwolla.co'
    
}

export async function savePlaidTokenToUser(userId: string, token: string) {
  const { databases } = await createAdminClient();


   
  await databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    userId,
    { plaidToken: token }
  );
  await fetchAndLogPlaidTransactions(userId);  
}


export async function fetchPlaidAccounts(userId: string, accessToken: string) {
  try {
    const res = await plaidClient.accountsGet({ access_token: accessToken })
    const accounts = res.data.accounts
    const enrichedAccounts =  
      accounts.map( account => {
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
         
        }
      })
    

   
    return enrichedAccounts
  } catch (error) {
    console.error('❌ Error in fetchPlaidAccountsWithFundingSources:', error)
    throw error
  }
}

export async function saveBankAccountsToAppwrite(accounts: any[], userId: string) {
  const { databases } = await createAdminClient();

  for (const account of accounts) {
     
    const existing = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      [
        Query.equal('userId', userId),
        Query.equal('accountId', account.accountId),
      ]
    );

    if (existing.total > 0) {

      continue;
    }

     
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

    
  }
}
export async function fetchTransactionsFromAppwrite(userId: string) {
  const { databases } = await createAdminClient();

  const sentTransactions = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID!,
    [Query.equal("senderUserId", userId)]
  );
  
  const receivedTransactions = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID!,
    [Query.equal("receiverUserId", userId)]
  );
  


   
  const allTransactions = [...sentTransactions.documents, ...receivedTransactions.documents];
   
  return allTransactions.sort((a, b) => new Date(b.authorizedDate).getTime() - new Date(a.authorizedDate).getTime());
}




 
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
    const { account } = await createAdminClient();
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
   
    const { databases } = await createAdminClient();
    const accountDocs = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
   
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
   
    const { databases } = await createAdminClient();
    const updated = await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      accountId,
      { banklyAddress: newAddress }
    );

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

    return deleted;
  } catch (error) {
    console.error('Failed to delete bank account:', error);
    throw error;
  }
};


export async function findUserByBanklyAddress(banklyAddress: string) {
  try {
    const { databases } = await createAdminClient();
    // Step 1: Search the accounts collection by bankly address
    const accountRes = await databases.listDocuments( process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
     [
      Query.equal("banklyAddress", banklyAddress+"@bankly.com"),
      Query.limit(1),
    ]);

    if (accountRes.total === 0) {
      throw new Error("No account found with this Bankly address.");
    }
    
    const account = accountRes.documents[0];
    const { accountId,cardNumber, userId } = account;

    // Step 2: Get the user info from the users collection
    const userRes = await databases.getDocument(process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!, userId.$id);
 
    const { firstName, lastName } = userRes;

    return {
      firstName,
      lastName,
      accountId,
      cardNumber,
      userId: userId.$id,
    };
  } catch (error) {
    console.error("Error fetching user by Bankly address:", error);
    throw error;
  }
}

export async function applyTransaction({
  senderAccountId,
  receiverAccountId,
  senderUserId,
  receiverUserId,
  amount,
}: {
  senderAccountId: string;
  receiverAccountId: string;
  senderUserId: string;
  receiverUserId: string;
  amount: number;
}) {
  const { databases } = await createAdminClient();

  const transactionId = ID.unique();
  const transactionUID= ID.unique();
  console.log('senderUserId', senderUserId);
  try {
    // 1. Create the transaction document with status "pending"
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID!,
      transactionUID, 
      {
        transactionId,
        senderUserId,
        senderAccountId,
        receiverUserId,
        receiverAccountId,
        merchantName: "Bankly transfer",
        category:['Transfer'],
        amount,
        status: "pending",
        authorizedDate: new Date(),
        banklyTransfer: true,
      }
    );

    //2. Fetch sender and receiver accounts
    const senderAccount = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      [
        Query.equal('accountId', senderAccountId),
        Query.limit(1) // Replace 'yourFieldName' with the correct field
      ]
    );

    const receiverAccount = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      [
        Query.equal('accountId', receiverAccountId),
        Query.limit(1) // Replace 'yourFieldName' with the correct field
      ]
    )

    // 3. Check if sender has enough balance
    if (senderAccount.documents[0].availableBalance < amount) {
      throw new Error("Insufficient balance");
    }

    // 4. Update sender's available balance (subtract)
    await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      senderAccount.documents[0].$id,
      {
        availableBalance: senderAccount.documents[0].availableBalance - amount,
      }
    );

    // 5. Update receiver's available balance (add)
    await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      receiverAccount.documents[0].$id,
      {
        availableBalance: receiverAccount.documents[0].availableBalance + amount,
      }
    );

    // 6. Mark transaction as successful
    await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID!,
      transactionUID,
      {
        status: "successful",
      }
    );

     return { success: true };
  } catch (error) {
    console.error("❌ Error applying transaction:", error);

    // 7. If any error, mark transaction as failed
    // await databases.updateDocument(
    //   process.env.APPWRITE_DATABASE_ID!,
    //   process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID!,
    //   transactionId,
    //   {
    //     status: "failed",
    //   }
    // );

    throw error;
  }
}
