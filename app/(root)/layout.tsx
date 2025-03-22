import type { Metadata } from "next";
import '../globals.css'
import SideBar from "@/components/SideBar";
import Image from "next/image";
import MobileNavMenu from "@/components/MobileNavMenu";



export const metadata: Metadata = {
  title: "Bankly - your money, your way",
  description: "easy webapp to transfer money instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user:User = {
    firstName: "Seif",
    lastName: "Amr",
    email:"seifammar1125:gmail.com"
  };

  return (
   <main className="flex flex-col ">

    
<div className="flex justify-between items-center p-2 md:hidden">
<Image src="/icons/logo.svg" alt="bankly logo" width={30} height={30} />
<MobileNavMenu  />
</div>
<div className="flex">
  <SideBar  firstName={user.firstName} lastName={user.lastName} email={user.email} />
  
    {children}
</div>
    
   </main>
  );
}