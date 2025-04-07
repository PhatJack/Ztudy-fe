import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useChatContext } from "@/hooks/useChatContext";
import { LogOut, Power } from "lucide-react";
import React from "react";

interface Props {
  roomCode: string;
  onLeave: () => void;
  onEnd?: () => void;
  children: React.ReactNode;
}

const LeaveRoomDialog = ({ roomCode, onLeave, onEnd, children }: Props) => {
  const [state] = useAuthContext();
  const { currentRoom } = useChatContext();
  const isCreator = currentRoom?.creator_user === state.user?.id;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Room</DialogTitle>
          <DialogDescription>
            {isCreator
              ? "As the room creator, you can choose to leave or end the room for everyone."
              : "Are you sure you want to leave this room?"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 justify-end">
          {isCreator ? (
            <>
              <Button
                variant="outline"
                onClick={onLeave}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Leave Room
              </Button>
              <Button
                variant="destructive"
                onClick={onEnd}
                className="flex items-center gap-2"
              >
                <Power className="w-4 h-4" />
                End Room
              </Button>
            </>
          ) : (
            <Button
              variant="destructive"
              onClick={onLeave}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Leave Room
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveRoomDialog; 