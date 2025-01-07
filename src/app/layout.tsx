import LenisContainer from '@/utils/lenis/LenisContainer';
import type { Metadata } from "next";
import { Fjalla_One, Red_Hat_Display } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-red-hat-display" });
const fjallaOne = Fjalla_One({ subsets: ["latin"], weight: ["400",], variable: "--font-fjalla-one" });


export const metadata: Metadata = {
  title: "Aurélie Feuillard - Visualize projects",
  description: "Portfolio 3D de présentation de quelques unes des mes réalisations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${redHatDisplay.variable} ${fjallaOne.variable}`}>
        <LenisContainer>{children}</LenisContainer>
      </body>
    </html>
  );
}
