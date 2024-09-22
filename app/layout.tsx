import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import Loading from "./loading";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "More Tours & Travel",
  description: "The Best Tour Guide Company In Lesotho",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("h-full scroll-smooth antialiased", inter.className)}
      >
        <body className={cn("flex min-h-full flex-col")}>
          {/* Navbar */}
          <ClerkLoading>
            <Loading />
          </ClerkLoading>
          <ClerkLoaded>
            <main className="grow">{children}</main>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}