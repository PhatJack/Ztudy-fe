"use client";
import { SoloProvider } from "@/contexts/SoloContext";

export default function SoloProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SoloProvider>{children}</SoloProvider>;
}
