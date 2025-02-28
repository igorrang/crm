import type { Metadata } from "next";

import "./globals.css";
import React from "react";
import { Providers } from './providers'


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
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
