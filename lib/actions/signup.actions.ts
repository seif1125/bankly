// src/app/signup/page.jsx

// previous imports ...
 "use server";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignupData } from "@/types";


export async function signupUser(formData:SignupData) {
 



  const { account,databases } = await createAdminClient();

  const user=await account.create(ID.unique(), formData.email, formData.password, `${formData.firstName} ${formData.lastName}`);
  const session = await account.createEmailPasswordSession(formData.email, formData.password);
  await databases.createDocument(
    process.env.APPWRITE_DATABASE_ID!,                // Your DB ID
    process.env.APPWRITE_USER_COLLECTION_ID!,         // Your collection ID
    ID.unique(),                                      // Document ID
    {
      id: user.$id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      country: formData.country,
      mobile: formData.mobile,
      
      dateOfBirth: formData.dateOfBirth,
      password:formData.password
    }
  );
  cookies().set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
   redirect('/sign-in')
}

// the SignUpPage component ...
