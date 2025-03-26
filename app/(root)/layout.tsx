import type { Metadata } from "next";
import '../globals.css'
import SideBar from "@/components/SideBar";
import Image from "next/image";
import MobileNavMenu from "@/components/MobileNavMenu";
import { getLoggedInUser } from "@/lib/actions/users.actions";
import { UserProvider } from "@/contexts/UserContext";
import { User } from "@/types";
import { parseStringify } from "@/lib/utils";
import { redirect } from "next/navigation";




export const metadata: Metadata = {
  title: "Bankly - your money, your way",
  description: "easy webapp to transfer money instantly",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const userJSON = await getLoggedInUser();
  if (typeof userJSON === "object" && userJSON !== null && Object.keys(userJSON).length === 0) {
    redirect("/sign-in");
  }
  const user=parseStringify(userJSON)

 
  return (
   <main className="flex flex-col ">

    
<div className="flex justify-between items-center p-2 md:hidden">
<Image src="/icons/logo.svg" alt="bankly logo" width={30} height={30} />
<MobileNavMenu user={user as User} />
</div>
<div className="flex">
  <SideBar  user={user as User} />
  
  <UserProvider user={user as User}>{children}</UserProvider>
</div>
    
   </main>
  );
}