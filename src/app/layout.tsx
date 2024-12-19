import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-red-hat-display" });

export const metadata: Metadata = {
  title: "Projet portfolio",
  description: "Liste des projets sous forme d'affiche 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={redHatDisplay.className}>{children}</body>
    </html>
  );
}
