import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

import { CartProvider } from '@/context/cart';
import CartButton from '@/components/CartButton';
import CartDrawer from '@/components/CartDrawer';
import { Toaster } from "@/components/ui/sonner";
import WhatsAppButton from "@/components/WhatsappButton";

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
        className={`${quicksand.className} min-h-screen antialiased bg-gradient-to-b bg-fixed from-yellow-400 via-orange-500 to-pink-500`}
      >
        <CartProvider>
          <CartButton />
          <WhatsAppButton />
          <CartDrawer />
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
