import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jobo Analytics",
  description: "Dashboard analytique en temps réel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* On met le fond en noir dès la racine */}
      <body className={`${inter.className} h-full bg-black text-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}