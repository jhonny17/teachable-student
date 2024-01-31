import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@usefedora/ui/public/reset";
import "@usefedora/ui/public/common";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teachable | Student",
  description: "Teachable's student site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        yep! main layout
        {children}
      </body>
    </html>
  );
}
