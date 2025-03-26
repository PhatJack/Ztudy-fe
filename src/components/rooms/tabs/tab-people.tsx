import AvatarCustom from "@/components/avatar/AvatarCustom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Participant } from "@/contexts/ChatContext";
import { useAssignAdminMutation } from "@/service/(rooms)/request/request.api";
import React from "react";

interface Props {
  participants: Participant[];
  roomCode: string;
}

const TabPeople = ({ participants, roomCode }: Props) => {
  const { mutate: assignAdmin } = useAssignAdminMutation();

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-[65px] border-b bg-white p-4 shadow-lg">
        <Input type="text" placeholder="Search people" />
      </div>
      <div className="overflow-y-auto flex flex-col space-y-4 p-4">
        {participants.map((participant, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AvatarCustom src={participant.user?.avatar} />
              <span className="font-semibold">
                {participant.user?.username}
              </span>
            </div>
            <div className="flex gap-2">
              {!participant.is_admin ? (
                <Button
                  size={"sm"}
                  variant={"warning"}
                  type="button"
                  onClick={() =>
                    assignAdmin({ roomCode, userId: participant.user.id })
                  }
                >
                  Admin
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TabPeople);
