"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  ChevronDown,
  ChevronRight,
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

const tabs: {
  name: string;
  value: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Request To Join",
    value: "requestToJoin",
    icon: <UserRoundPlus size={22} />,
  },
  {
    name: "Room Chat",
    value: "roomChat",
    icon: <MessagesSquare size={22} />,
  },
];
const RoomDetail = ({ roomCode }: Props) => {
  return (
    <div className="size-full flex xl:flex-row flex-col gap-4 xl:h-[calc(100vh-2.5rem)] overflow-hidden">
      <div className="p-4 xl:w-[75%] flex-1 bg-white dark:bg-background rounded-lg"></div>
      <div className="xl:w-[25%] overflow-y-auto bg-white dark:bg-background h-full rounded-lg flex flex-col gap-4 overflow-hidden">
        <Tabs
          className="xl:max-h-full xl:min-h-full min-h-[500px] max-h-[500px] relative overflow-y-auto"
          defaultValue="requestToJoin"
        >
          <TabsList className="grid w-full grid-cols-2 p-4 h-fit bg-white rounded-b-none sticky top-0 border-b shadow-md">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold gap-1"
                value={tab.value}
              >
                {tab.name}
                {tab.value === "requestToJoin" && (
                  <span className="data-[state=active]:text-primary-foreground">{`(3)`}</span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="requestToJoin">
            <div className="h-full p-4">
              <div className="overflow-y-auto flex flex-col space-y-4 pe-2">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
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
            </div>
          </TabsContent>
          <TabsContent value="roomChat">
            <div className="">
              <div className="p-4 h-full">
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
              </div>
              <div className="p-4 border-t sticky bottom-0 bg-white dark:bg-background">
                <div className="flex items-center gap-2">
                  <Input type="text" placeholder="Type a message..." />
                  <Button size={"icon"} className="bg-primary text-white">
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoomDetail;
