import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import Image from "next/image";

import Header from "@/components/header";
import Logo from "@/public/logo-dark.svg";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="flex justify-center md:px-10 min-h-90">
            {children}
          </div>
          <div className="flex flex-col justify-center align-center w-full text-center py-5 dark:bg-slate-900 bg-slate-400 static bottom-0 mt-40">
            <div>
              <Image src={Logo} alt="Klix.ba" width={70} />
            </div>
            <p className="text-xs">
              Ovaj stranica je naravljena u svrhu zabave i ne odražava mišljenje
              autora.
            </p>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
