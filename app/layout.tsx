import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Site",
  description: "Your awesome e-commerce site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={`${inter.className} bg-primary text-text-primary`}>
          <Header />
          <main className="flex-grow pt-16 px-24">{children}</main>
          <Footer />
        </body>
      </CartProvider>
    </html>
  );
}
