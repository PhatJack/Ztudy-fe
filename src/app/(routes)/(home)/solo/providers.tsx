"use client";
import { SoloProvider } from "@/contexts/SoloContext";
import { SoloPomodoroProvider } from "@/contexts/SoloPomodoroContext";
import { SoloSoundProvider } from "@/contexts/SoloSoundContext";

export default function SoloProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SoloProvider>
      <SoloPomodoroProvider>
        <SoloSoundProvider>{children}</SoloSoundProvider>
      </SoloPomodoroProvider>
    </SoloProvider>
  );
}
