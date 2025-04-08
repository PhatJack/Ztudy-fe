import type { Metadata } from "next";
import "./globals.css";
import "./theme-toggle.css";
import { Nunito, Quicksand } from "next/font/google";
import Providers from "./providers";

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
      <body className={`${nunito.className} antialiased relative bg-muted/60`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
