import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"
import LayoutProvider from "@/components/layout-provider/LayoutProvider";

const noto_sans = Nunito({
  subsets: ["latin"],
  weight: ["600", "700"]
});

export const metadata: Metadata = {
  title: "More Tours & Travel",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <LayoutProvider>
        <body className={noto_sans.className}>
          {children}
        </body>
        </LayoutProvider>
      </SessionProvider>
    </html>
  );
}
