import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface Props {
  handleJoinRoom: (code: string) => void;
}

function JoinRoomWithCode({ handleJoinRoom }: Props) {
  const [roomCode, setRoomCode] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleJoinRoom(roomCode);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Join Room With Code</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Room With Code</DialogTitle>
          <DialogDescription>
            Enter the code to join room with your friends
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid sm:grid-cols-4 gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <Input
            id="roomCode"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="sm:col-span-3"
            placeholder="Enter room code"
          />
          <Button type="submit" variant="info" className="font-bold">
            Join
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default React.memo(JoinRoomWithCode);
