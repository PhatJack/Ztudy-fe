import { apiClient } from "@/lib/client";
import { ListRoomsResponseSchema } from "@/service/(rooms)/room/list-rooms.api";
import React from "react";
import RoomDetail from "../_components/RoomDetail";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: number };
}) {
  let room = null;

  try {
    const res = await apiClient.get<ListRoomsResponseSchema>("/rooms/");
    if (res?.data?.results) {
      room = res.data.results.find(
        (room) => room.id === Number(params.roomCode)
      );
    }
  } catch (error) {
    console.error("Failed to fetch room data:", error);
  }

  return {
    title: `Phòng họp ${room?.code_invite}`,
    description: `Tham gia học nhóm trong phòng ${params.roomCode} với chủ đề ${room?.category}`,
  };
}

export default async function Page({ params }: { params: { roomCode: string } }) {
  return <RoomDetail roomCode={params.roomCode} />;
}
