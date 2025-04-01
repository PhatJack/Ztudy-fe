import React from "react";
import RoomDetail from "../_components/RoomDetail";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: string };
}) {

  return {
    title: `Room ${params.roomCode}`,
    description: `Join room ${params.roomCode}`,
  };
}

export default async function Page({
  params,
}: {
  params: { roomCode: string };
}) {
  return <RoomDetail roomCode={params.roomCode} />;
}
