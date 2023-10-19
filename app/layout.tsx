import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KLIX COMMENT GEN",
  description: "Generiši komentar za Klix.ba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="md:p-10">{children}</div>
      </body>
    </html>
  );
}
