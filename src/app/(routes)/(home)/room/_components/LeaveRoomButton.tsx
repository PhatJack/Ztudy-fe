import { Button } from "@/components/ui/button";
import { useLeaveRoomMutation } from "@/service/(rooms)/room/leave-room.api";
import React from "react";

interface Props {
  handleLeaveRoom: () => void;
  roomCode: string;
}

const LeaveRoomButton = ({ handleLeaveRoom, roomCode }: Props) => {
  const leaveRoomMutation = useLeaveRoomMutation();

  const onClick = () => {
    leaveRoomMutation.mutate(roomCode, {
      onSuccess: () => {
        handleLeaveRoom();
      },
    });
  };

  return (
    <Button variant="destructive" type="button" onClick={() => onClick()}>
      Leave room
    </Button>
  );
};

export default LeaveRoomButton;
