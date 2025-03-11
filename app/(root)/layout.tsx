import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Bankly - your money, your way",
  description: "easy webapp to transfer money instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main>
    <h1>sidebar</h1>
    {children}
   </main>
  );
}