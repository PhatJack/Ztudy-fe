import { Button } from "@/components/ui/button";
import { useRoomWebSocket } from "@/contexts/WebSocketContext";
import { useLeaveRoomMutation } from "@/service/(rooms)/room/leave-room.api";
import { useEndRoomMutation } from "@/service/(rooms)/room/end-room.api";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import LeaveRoomDialog from "./LeaveRoomDialog";
import { useChatContext } from "@/hooks/useChatContext";

interface Props {
  roomCode: string;
}

const LeaveRoomButton = ({ roomCode }: Props) => {
  const router = useRouter();
  const { disconnectChatSocket } = useRoomWebSocket();
  const { setCurrentRoom, setIsAdmin } = useChatContext();
  const leaveRoomMutation = useLeaveRoomMutation();
  const endRoomMutation = useEndRoomMutation();

  const handleLeaveRoom = () => {
    leaveRoomMutation.mutate(roomCode, {
      onSuccess: () => {
        disconnectChatSocket();
        setCurrentRoom(null);
        setIsAdmin(false);
        toast.success("You have left the room.");
        router.push("/room");
      },
    });
  };

  const handleEndRoom = () => {
    endRoomMutation.mutate(roomCode, {
      onSuccess: () => {
        disconnectChatSocket();
        toast.success("Room has been ended.");
        router.push("/room");
      },
    });
  };

  return (
    <LeaveRoomDialog
      roomCode={roomCode}
      onLeave={handleLeaveRoom}
      onEnd={handleEndRoom}
    >
      <Button
        type="button"
        size={"icon"}
        variant={"destructive"}
        className="rounded-full w-12 h-12 [&_svg]:size-5"
      >
        <PhoneCall className="rotate-[135deg]" />
      </Button>
    </LeaveRoomDialog>
  );
};

export default LeaveRoomButton;
