import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catálogo Luma Festas",
  description: "Catálogo de produtos Luma Festas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="light" lang="en">
      <body
        className={`${quicksand.className} antialiased bg-gradient-to-b bg-fixed from-yellow-400 via-orange-500 to-pink-500`}
      >
        {children}
      </body>
    </html>
  );
}
