import type { Metadata } from "next";



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
   <main>
    {children}
   </main>
  );
}