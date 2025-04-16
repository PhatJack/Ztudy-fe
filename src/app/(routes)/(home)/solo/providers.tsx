"use client";
import { SoloPomodoroProvider } from "@/contexts/SoloPomodoroContext";
import { SoloSoundProvider } from "@/contexts/SoloSoundContext";
import dynamic from "next/dynamic";

const SoloProviderDynamic = dynamic(
  () => import("@/contexts/SoloContext").then((mod) => mod.SoloProvider),
  {
    ssr: false,
  }
);

export default function SoloProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SoloProviderDynamic>
      <SoloPomodoroProvider>
        <SoloSoundProvider>{children}</SoloSoundProvider>
      </SoloPomodoroProvider>
    </SoloProviderDynamic>
  );
}
