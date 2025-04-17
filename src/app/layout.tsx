import type { Metadata } from "next";
import "./globals.css";
import "./theme-toggle.css";
import { Nunito } from "next/font/google";
import Providers from "./providers";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata: Metadata = {
  title: {
    template: "%s | Ztudy - Stay Focused",
    default: "Home | Ztudy - Stay Focused",
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
    "Ztudy is a collaborative study platform with video calls, chat, screen sharing, and focus tools like mic muting—perfect for solo or group learning.",
  keywords: [
    "Ztudy",
    "study together",
    "study app",
    "collaborative learning",
    "focus tool",
    "video call study",
    "productivity app",
    "study with friends",
    "distraction-free study",
    "study platform",
    "online learning",
    "study group",
  ],
  openGraph: {
    title: "Ztudy - Stay Focused",
    description:
      "Ztudy is a collaborative learning platform where you can study with friends or solo. Enjoy features like video calls, chat, screen sharing, and distraction-free modes—like muting mics—to stay 100% focused. Boost productivity and learning together!",
    url: "https://ztudy.io.vn",
    siteName: "Ztudy",
    type: "website",
    images: [
      {
        url: "https://ztudy.io.vn/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Ztudy - Stay Focused",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ztudy - Stay Focused",
    description:
      "Ztudy is a collaborative learning platform where you can study with friends or solo. Enjoy features like video calls, chat, screen sharing, and distraction-free modes—like muting mics—to stay 100% focused. Boost productivity and learning together!",
    creator: "@jackphatdev",
    images: [
      {
        url: "https://ztudy.io.vn/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Ztudy - Stay Focused",
      },
    ],
  },
  metadataBase: new URL("https://ztudy.io.vn"),
  // <meta name="google-site-verification" content="TYbYwRqKc8Fxxmo-tVarr6-MBeL1y1LTKFFJ5WgGqR0" />
  verification: {
    google: "TYbYwRqKc8Fxxmo-tVarr6-MBeL1y1LTKFFJ5WgGqR0",
  },
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
