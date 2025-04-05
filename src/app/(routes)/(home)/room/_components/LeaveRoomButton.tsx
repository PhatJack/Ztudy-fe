import { Button } from "@/components/ui/button";
import { useRoomWebSocket } from "@/contexts/WebSocketContext";
import { useLeaveRoomMutation } from "@/service/(rooms)/room/leave-room.api";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";

interface Props {
  roomCode: string;
}

const LeaveRoomButton = ({ roomCode }: Props) => {
  const router = useRouter();
  const { disconnectChatSocket } = useRoomWebSocket();
  const leaveRoomMutation = useLeaveRoomMutation();

  const handleLeaveRoom = () => {
    disconnectChatSocket();
    toast.success("You have left the room.");
    router.push("/room");
  };

  const onClick = () => {
    leaveRoomMutation.mutate(roomCode, {
      onSuccess: () => {
        handleLeaveRoom();
      },
    });
  };

  return (
    <TooltipTemplate content="Leave room">
      <Button
        type="button"
        size={"icon"}
        variant={"destructive"}
        className="rounded-full w-12 h-12 [&_svg]:size-5"
        onClick={onClick}
      >
        <PhoneCall className="rotate-[135deg]" />
      </Button>
    </TooltipTemplate>
  );
};

export default LeaveRoomButton;
