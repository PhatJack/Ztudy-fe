"use client";
import { useState, useEffect, ReactNode, useRef } from "react";
import type { ClientConfig, IAgoraRTCClient } from "agora-rtc-react";
import dynamic from "next/dynamic";

const AgoraRTCProviderPrimitive = dynamic(
  () =>
    import("agora-rtc-react").then(({ AgoraRTCProvider }) => AgoraRTCProvider),
  {
    ssr: false,
  }
);

export default function AgoraRTCProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientConfigRef = useRef<ClientConfig>({ mode: "rtc", codec: "vp8" });
  const [client, setClient] = useState<IAgoraRTCClient>();

  useEffect(() => {
    const initSdk = async () => {
      const AgoraRTC = (await import("agora-rtc-react")).default;
      setClient(AgoraRTC.createClient(clientConfigRef.current));
    };
    initSdk();
  }, []);

  return (
    client && (
      <AgoraRTCProviderPrimitive client={client}>
        {children}
      </AgoraRTCProviderPrimitive>
    )
  );
}
