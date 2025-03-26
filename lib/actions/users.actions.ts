// src/app/signup/page.ts (or wherever your server action is)
"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"; // ✅ Keep this, it's server-side
import { SignupData, loginData } from "@/types";

export async function signupUser(formData: SignupData) {
  try {
    const { account, databases } = await createAdminClient();

    // Create user account
    const user = await account.create(
      ID.unique(),
      formData.email,
      formData.password,
      `${formData.firstName} ${formData.lastName}`
    );

    // Create session
    const session = await account.createEmailPasswordSession(
      formData.email,
      formData.password
    );

    // Save custom user profile in your Appwrite database
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        userId: user.$id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        country: formData.country,
        dateOfBirth: formData.dateOfBirth,
      }
    );

    // Set secure session cookie
    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // ✅ Use server-side redirect instead of router.push()
    redirect("/sign-in");
  } catch (error) {
    console.error("❌ Signup error:", error);
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


export async function signOutUser(){
  const { account } = await createAdminClient();

  account.deleteSession('current');
  cookies().delete('my-custom-session');
  redirect('/sign-in')


}