import type { Metadata } from "next";
import Image from "next/image";



export const metadata: Metadata = {
  title: "Bankly - sign ",
  description: "easy webapp to transfer money instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className="flex justify-between min-h-screen w-full">
    {children}
    <div className="auth-asset">
       <div>
        <Image src={'./icons/auth-image.svg'} alt="auth image" width={500} height={500} />
       </div>
    </div>
   </main>
  );
}