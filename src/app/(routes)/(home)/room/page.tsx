import { Metadata } from "next";
import RoomPage from "./_components/RoomPage";

export const meta: Metadata = {
  title: "Room",
  description: "Join a room to learn with people around the world",
};

export default function Room() {
  return <RoomPage />;
}
