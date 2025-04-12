import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Rooms",
};
export default function RoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
