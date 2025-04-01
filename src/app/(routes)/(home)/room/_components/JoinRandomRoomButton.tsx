import { Button } from "@/components/ui/button";
import { useJoinRandomRoomMutation } from "@/service/(rooms)/room/join-random-room.api";
import { Shuffle } from "lucide-react";
import React from "react";

interface Props {
  handleJoinRandomRoom: () => void;
}

const JoinRandomRoomButton = ({ handleJoinRandomRoom }: Props) => {
  return (
    <Button
      variant="info"
      type="button"
      onClick={() => handleJoinRandomRoom()}
    >
      <Shuffle />
      Join random room
    </Button>
  );
};

export default React.memo(JoinRandomRoomButton);
