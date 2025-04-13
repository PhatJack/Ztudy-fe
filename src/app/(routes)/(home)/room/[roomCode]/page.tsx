import React from "react";
import RoomDetail from "../_components/RoomDetail";

export function generateMetadata({ params }: { params: { roomCode: string } }) {
  return {
    title: `Room - ${params.roomCode}`,
    description: `Join room ${params.roomCode} to learn with people around the world`,
  };
}

export default function Page({ params }: { params: { roomCode: string } }) {
  return <RoomDetail roomCode={params.roomCode} />;
}
