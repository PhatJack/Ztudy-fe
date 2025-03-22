import { apiClient } from "@/lib/client";
import { ListRoomsResponseSchema } from "@/service/(rooms)/room/list-rooms.api";
import React from "react";
import RoomDetail from "../_components/RoomDetail";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: string };
}) {
  let room = null;

  try {
    const res = await apiClient.get<ListRoomsResponseSchema>(
      `/rooms/?code_invite=${params.roomCode}`
    );
    if (res?.data?.results[0]) {
      room = res.data.results[0];
    }
  } catch (error) {
    console.error("Failed to fetch room data:", error);
  }

  return {
    title: `Room ${room?.code_invite}`,
    description: `Join room ${params.roomCode} with subject ${room?.category}`,
  };
}

export default async function Page({
  params,
}: {
  params: { roomCode: string };
}) {
  return <RoomDetail roomCode={params.roomCode} />;
}
