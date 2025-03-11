import type { Metadata } from "next";
import { Inter,IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const ibm_plex_serif=IBM_Plex_Serif({subsets:["latin"],weight:'500'})

export const metadata: Metadata = {
  title: "Bankly - transfer instantly",
  description: "easy webapp to transfer money instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${ibm_plex_serif.className}`}>{children}</body>
    </html>
  );
}
