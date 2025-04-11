"use client";

import React, { useState } from "react";
import RoomDetail from "../_components/RoomDetail";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

export default function RoomDetailWrapper({ roomCode }: { roomCode: string }) {
  const [client] = useState(() =>
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );
  return (
    <AgoraRTCProvider client={client}>
      <RoomDetail roomCode={roomCode} />
    </AgoraRTCProvider>
  );
}
