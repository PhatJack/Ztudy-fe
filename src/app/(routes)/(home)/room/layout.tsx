import RoomProviders from "./providers";

export default function RoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RoomProviders>{children}</RoomProviders>;
}
