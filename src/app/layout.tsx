import type { Metadata } from "next";
import { Luckiest_Guy } from "next/font/google";
import "./globals.css";

const luckiestGuy = Luckiest_Guy({ subsets: ["latin"], weight: "400", variable: "--font-luckiest-guy" });

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
    <html lang="en">
      <body className={luckiestGuy.className}>{children}</body>
    </html>
  );
}
