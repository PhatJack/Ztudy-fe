import AvatarCustom from "@/components/avatar/AvatarCustom";
import RoleBadge from "@/components/badge/RoleBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Participant } from "@/contexts/ChatContext";
import { useChatContext } from "@/hooks/useChatContext";
import {
  useAssignAdminMutation,
  useRevokeAdminMutation,
} from "@/service/(rooms)/request/request.api";
import { Shield, ShieldOff, Search } from "lucide-react";
import React, { useState } from "react";

interface Props {
  participants: Participant[];
  roomCode: string;
}

const TabPeople = ({ participants, roomCode }: Props) => {
  const { mutate: assignAdmin } = useAssignAdminMutation();
  const { mutate: revokeModerator } = useRevokeAdminMutation();
  const { isAdmin, currentRoom } = useChatContext();
  const [search, setSearch] = useState("");

  const filteredParticipants = participants.filter((participant) =>
    participant.user?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col ">
      <div className="sticky top-[65px] border-b bg-white p-4 shadow-lg dark:bg-background">
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Search people"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex flex-col space-y-4 p-4">
        {filteredParticipants.map((participant, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <AvatarCustom src={participant.user?.avatar} />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {participant.user?.username}
                </span>
                <RoleBadge role={participant.role} />
              </div>
            </div>
            <div className="flex gap-2">
              {currentRoom?.type === "PRIVATE" && isAdmin && participant.role === "USER" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"sm"}
                        variant={"warning"}
                        type="button"
                        onClick={() =>
                          assignAdmin({ roomCode, userId: participant.user.id })
                        }
                        className="flex items-center gap-2 bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                      >
                        <Shield className="h-4 w-4" />
                        <span>Make Moderator</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Promote to moderator role</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {currentRoom?.type === "PRIVATE" && isAdmin && participant.role === "MODERATOR" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"sm"}
                        variant={"destructive"}
                        type="button"
                        onClick={() =>
                          revokeModerator({
                            roomCode,
                            userId: participant.user.id,
                          })
                        }
                        className="flex items-center gap-2"
                      >
                        <ShieldOff className="h-4 w-4" />
                        <span>Remove Moderator</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove moderator privileges</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabPeople;
