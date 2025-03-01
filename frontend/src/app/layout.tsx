import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";
import { Providers } from "./providers"; // Verifique se o caminho está correto
import '../globals.css'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "600"],
  style: "normal",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Crm Konvictus",
  description: "Desenvolvido por Konvictus",
  icons: {
    icon: "/KonvictusLogo.png" // Certifique-se de que o arquivo está na pasta `public/`
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}