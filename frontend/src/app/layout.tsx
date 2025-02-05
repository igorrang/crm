import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "600"] });

export const metadata: Metadata = {
  title: "Crm Konvictus",
  description: "Desenvolvido por Konvictus",
  icons: {
    icon: "KonvictusLogo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
