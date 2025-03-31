"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"; // ✅ Server-side redirect
import { SignupData, loginData } from "@/types";
import { plaidClient } from "../plaid";
import { dwollaClient } from "../dwolla";

export async function signupUser(formData: any) {
  try {
    const { account, databases } = await createAdminClient();

    // **Step 1: Create User in Appwrite**
    const user = await account.create(
      ID.unique(),
      formData.email,
      formData.password,
      `${formData.firstName} ${formData.lastName}`
    );

    // **Step 2: Create Dwolla Customer**
    const dwollaRes = await dwollaClient.post('customers', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });

    const dwollaCustomerUrl = dwollaRes.headers.get('Location') || dwollaRes.data._links?.self?.href;

    // **Step 3: Generate Plaid Link Token**
    const plaidRes = await plaidClient.linkTokenCreate({
      user: { client_user_id: user.$id },
      client_name: 'Bankly',
      products: ['auth', 'transactions'],
      country_codes: ['US'], // Modify for your country
      language: 'en',
    });

    const plaidLinkToken = plaidRes.data?.link_token || '';

    // **Step 4: Store User Data in Appwrite**
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        id: ID.unique(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        dateOfBirth:formData.dateOfBirth,
        password:formData.password,
        country: formData.country,
        dwollaUrl: dwollaCustomerUrl,
        plaidLinkToken: plaidLinkToken,
      }
    );

    // **Step 5: Set a Custom Session**
    const session = await account.createEmailPasswordSession(
      formData.email,
      formData.password
    );

    cookies().set('my-custom-session', session.$id, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    redirect('/');
  } catch (error) {
    console.error('❌ Signup error:', error);
    throw error;
  }
}

export async function loginUser(formData: loginData) {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(
      formData.email,
      formData.password
    );
     console.log(session);
    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // ✅ Redirect after login
    redirect("/");
  } catch (error) {
    console.error("❌ Login error:", error);
    throw error;
  }
}
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get(); // returns User<Preferences>
  } catch (error) {
    return error; // instead of null
  }
}

export async function logOutUser() {
  const { account } = await createSessionClient();

  try {
    // Delete the session from Appwrite
    await account.deleteSession("current");

    // Remove custom cookie
    cookies().delete("my-custom-session");

    // ✅ Redirect directly
    redirect("/sign-in");
  } catch (error) {
    console.error("❌ Logout error:", error);
    throw error; // optional, to bubble up error handling
  }
}
