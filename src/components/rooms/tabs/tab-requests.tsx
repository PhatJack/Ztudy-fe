"use client";
import AvatarCustom from "@/components/avatar/AvatarCustom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Participant } from "@/contexts/ChatContext";
import {
  useApproveRequestMutation,
  useRejectRequestMutation,
} from "@/service/(rooms)/request/request.api";
import { Check, X } from "lucide-react";
import React from "react";

interface Props {
  requests: Participant[];
  roomCode: string;
}

const TabRequests = ({ requests, roomCode }: Props) => {
  const { mutate: approveRequest } = useApproveRequestMutation();
  const { mutate: rejectRequest } = useRejectRequestMutation();

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-[65px] border-b bg-white dark:bg-background p-4 shadow-lg">
        <Input type="text" placeholder="Search people" />
      </div>
      <div className="overflow-y-auto flex flex-col space-y-4 p-4">
        {requests.map((request, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AvatarCustom src={request.user?.avatar} />
              <span className="font-semibold">{request.user?.username}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size={"icon"}
                className="rounded-full bg-emerald-600 text-white"
                type="button"
                onClick={() =>
                  approveRequest({ roomCode, requestId: request.user.id })
                }
              >
                <Check />
              </Button>
              <Button
                size={"icon"}
                className="rounded-full bg-rose-600 text-white"
                type="button"
                onClick={() =>
                  rejectRequest({ roomCode, requestId: request.user.id })
                }
              >
                <X />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TabRequests);
