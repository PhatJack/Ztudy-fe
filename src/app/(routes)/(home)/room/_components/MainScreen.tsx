"use client";
import React from "react";
import LeaveRoomButton from "./LeaveRoomButton";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";
import RoomHeader from "./RoomHeader";
// import { useRoomDetailContext } from "@/contexts/RoomDetailContext";

const MainScreen = ({ roomCode }: { roomCode: string }) => {
  // const { remoteUsers } = useRoomDetailContext();

  // console.log(remoteUsers);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-background p-3 rounded-lg">
        <RoomHeader />
      </div>
      <div className="flex-1 p-4 rounded-lg bg-white dark:bg-background">
        {/* {remoteUsers.map((user) => (
          <div
            key={user.uid}
            className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden border-2 border-pink-500"
          >
            <div
              className="w-full h-full"
              ref={(element) => {
                if (element) {
                  user.videoTrack?.play(element);
                }
              }}
            ></div>
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-sm rounded-md">
              User {user.uid}
            </div>
          </div>
        ))} */}
      </div>
      <div className="p-3 rounded-lg bg-white dark:bg-background flex gap-6 justify-center items-center">
        <TooltipTemplate content="Camera">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            // variant={cameraEnabled ? "default" : "outline"}
            // onClick={() => setCameraEnabled(!cameraEnabled)}
          >
            {true ? <Camera /> : <CameraOff />}
          </Button>
        </TooltipTemplate>
        <TooltipTemplate content="Mute">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            // variant={micEnabled ? "default" : "outline"}
            // onClick={() => setMicEnabled(!micEnabled)}
          >
            {true ? <Mic /> : <MicOff />}
          </Button>
        </TooltipTemplate>
        <LeaveRoomButton roomCode={roomCode} />
        {/* <TooltipTemplate content="Presentation">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            // variant={cameraEnabled ? "default" : "outline"}
            // onClick={() => setCameraEnabled(!cameraEnabled)}
          >
            <MonitorPlay />
          </Button>
        </TooltipTemplate> */}
      </div>
      {/* <LeaveRoomButton handleLeaveRoom={handleLeaveRoom} roomCode={roomCode} /> */}
    </div>
  );
};

export default MainScreen;
