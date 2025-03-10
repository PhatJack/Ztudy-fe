"use client";
import { SoloProvider } from "@/contexts/SoloContext";
import { SoloSoundProvider } from "@/contexts/SoloSoundContext";

export default function SoloProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SoloProvider>
      <SoloSoundProvider>{children}</SoloSoundProvider>
    </SoloProvider>
  );
}
