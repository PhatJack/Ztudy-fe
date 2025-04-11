import React from "react";
import RoomDetailWrapper from "./providers";

export function generateMetadata({ params }: { params: { roomCode: string } }) {
  return {
    title: `Room ${params.roomCode}`,
    description: `Join room ${params.roomCode}`,
  };
}

export default function Page({ params }: { params: { roomCode: string } }) {
  return <RoomDetailWrapper roomCode={params.roomCode} />;
}
