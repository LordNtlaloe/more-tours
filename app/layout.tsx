import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const noto_sans = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"]
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
      <body className={noto_sans.className}>
        {children}
      </body>
    </html>
  );
}
