import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Nunito } from "next/font/google";
import Providers from "./providers";
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

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
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
  description:
    "Ztudy is a website for studying and learning.You can learn and study with your friends or create a solo room for yourself.The website have a lot of features like video call, chat, share screen, etc.But due to any distraction, we have to turn off all mic to let you 100% focus on your work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        className={`${nunito.className} ${geistSans.variable} ${geistMono.variable} antialiased relative bg-muted/60`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
