import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DefaultLayout from "@/components/layout/DefaultLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ztudy",
    default: "Home | Ztudy",
  },
  authors: [
    { name: "Jack Phat", url: "https://jackphat.vercel.app/" },
    { name: "Bui Hong Bao" },
    { name: "Bui Ngoc Thuc" },
    { name: "Tran Nhu Phu Quang" },
    { name: "Mai Trung Chinh" },
    { name: "Hoang Gia Bao" },
  ],
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
