import { Metadata } from "next";
import RoomPage from "./_components/RoomPage";

export const metadata: Metadata = {
  title: "Rooms",
};

export default function Room() {
  return <RoomPage />;
}
