
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";


export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = await cookies().get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
     return new Databases(client);   
    },
    get user(){
      return new Users(client)
    }
  };
}
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function logoutUser(){
  const { account } = await createSessionClient();
  try {
    const result = await account.deleteSession('current'); // 'current' logs out the active session
    cookies().delete('my-custom-session')
    console.log('User logged out:', result);
    return result;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}