"use client";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronDown,
  ChevronUp,
  MessagesSquare,
  UserRoundPlus,
  X,
} from "lucide-react";
import moment from "moment";
import React from "react";

interface Props {
  roomCode: string;
}

const RoomDetail = ({ roomCode }: Props) => {
  const [isOpenRequestToJoin, setIsOpenRequestToJoin] =
    React.useState<boolean>(true);
  const [isOpenRoomChat, setIsOpenRoomChat] = React.useState<boolean>(true);

  return (
    <div className="size-full flex xl:flex-row flex-col gap-4 xl:h-[calc(100vh-2.5rem)] overflow-hidden">
      <div className="p-4 xl:w-3/4 flex-1 bg-white dark:bg-background rounded-lg"></div>
      <div className="xl:w-1/4 overflow-y-auto bg-white dark:bg-background h-full rounded-lg flex flex-col gap-4 p-4 overflow-hidden">
        {/* <div className="flex flex-col gap-4 rounded-lg overflow-hidden">
          <div className="font-semibold px-4 py-3 border border-primary rounded-lg justify-between flex items-center">
            <p className="w-full flex items-center gap-1">
              <span>
                <UserRoundPlus size={22} />
              </span>
              <span>Request To Join</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="size-6 rounded-full flex justify-center items-center border border-secondary text-sm text-foreground">
                3
              </span>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="w-7 h-7"
                type="button"
                onClick={() => setIsOpenRequestToJoin(!isOpenRequestToJoin)}
              >
                {isOpenRequestToJoin ? <ChevronDown /> : <ChevronUp />}
              </Button>
            </div>
          </div>
          {isOpenRequestToJoin && (
            <div className="overflow-y-auto flex flex-col space-y-4 pe-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <span className="font-semibold">User {index}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size={"icon"}
                      className="rounded-full bg-emerald-600 text-white"
                    >
                      <Check />
                    </Button>
                    <Button
                      size={"icon"}
                      className="rounded-full bg-rose-600 text-white"
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}
        {/* <div className="flex flex-col gap-4 rounded-lg">
          <div className="font-semibold px-4 py-3 border border-primary rounded-lg justify-between flex items-center">
            <p className="w-full flex items-center gap-1">
              <span>
                <MessagesSquare size={22} />
              </span>
              <span>Room Chat</span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                size={"icon"}
                variant={"ghost"}
                className="w-7 h-7"
                type="button"
                onClick={() => setIsOpenRoomChat(!isOpenRoomChat)}
              >
                {isOpenRoomChat ? <ChevronDown /> : <ChevronUp />}
              </Button>
            </div>
          </div>
          {isOpenRoomChat && (
            <div className="overflow-y-auto flex flex-col space-y-4 pe-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">User {index}</span>
                    <span className="text-xs">
                      {moment(new Date()).format("LT")}
                    </span>
                  </div>
                  <div className="w-full h-auto rounded-md">
                    In ut adipisicing aliqua qui officia.Nulla consectetur
                    exercitation nisi esse quis cillum adipisicing do mollit
                    cillum exercitation est.
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default RoomDetail;
