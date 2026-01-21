import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: "../public/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exam-App | Modern Assessment Platform",
  description: "Create, share, and evaluate exams with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
