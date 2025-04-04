"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignupData, loginData } from "@/types";
import { dwollaClient } from "../dwollaConfig";
import { plaidClient } from "../plaid";
import { generateFakeCard } from "../utils";

// Helper function to handle API responses
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
      products: ["auth", "transactions"],
      country_codes: ["US", "CA"],
      language: "en",
    });

    const linkToken = handleApiResponse(response.data.link_token, "❌ Error generating Plaid Link Token");

    // Log the Plaid public link token to the console for debugging
    console.log("Plaid Public Link Token:", linkToken);

    return linkToken;
  } catch (error) {
    console.error("❌ Error generating Plaid Link Token:", error);
    throw error;
  }
}

export async function exchangePlaidToken(publicToken: string): Promise<string > {
  if (!publicToken) throw new Error('No public token provided');

  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });
console.log(response);
    const accessToken = response.data.access_token; // Safe check for institution_id

    // If the institution_id is not found, log it but continue with null value
 

    console.log("Plaid Access Token:", accessToken);
  
    return accessToken;
  } catch (error) {
    console.error('❌ Error exchanging Plaid token:', error);
    throw new Error('Failed to exchange Plaid public token');
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

  return await dwollaClient.post("customers", requestBody);
}

export async function savePlaidTokenToUser(userId: string, token: string) {
  const { databases } = await createAdminClient();
  console.log("Saving token for userId:", userId, "AccessToken:", token);

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
}


export async function fetchPlaidAccounts(accessToken: string, userId: string) {
  try {
    const response = await plaidClient.accountsGet({ access_token: accessToken });
    const accounts = response.data.accounts;
  console.log("Plaid Accounts:", accounts);

    const enrichedAccounts = accounts.map((account) => {
      const fakeCard = generateFakeCard(account.mask||'0000'); // Simulate card details

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
      };
    });

    console.log("Enriched Account Sample:", enrichedAccounts[0]);
    return enrichedAccounts;
  } catch (error) {
    console.error('❌ Error fetching Plaid accounts with card info:', error);
    throw error;
  }
}

export async function saveBankAccountsToAppwrite(userId: string, accounts: any[]) {
  const { databases } = await createAdminClient();
  for (const account of accounts) {
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ACCOUNTS_COLLECTION_ID!,
      'unique()', // Auto-generated ID
      {
        userId:account.userId,
        accountId: account.accountId,
        accountName: account.accountName,
        accountOfficialName: account.accountOfficialName,
        type: account.type,
        subtype: account.subtype,
        availableBalance: account.availableBalance,
        cardNumber: account.cardNumber,
        expiryDate: account.expiryDate,
      }
    );
  }
}


// Handle signup process
export async function signupUser(formData: SignupData) {
  try {
    const session = await createUserInAppwrite(formData);

    // Set session cookie
    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    redirect("/sign-in");
  } catch (error) {
    console.error("❌ Signup error:", error);
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

    

    redirect("/sign-in");
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

// Update user document with Plaid token
async function updatePlaidToken(userId: string, accessToken: string) {
  const { databases } = await createAdminClient();
  await databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    userId,
    { plaidToken: accessToken }
  );
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
    console.log(accountDocs);
    return accountDocs;

}