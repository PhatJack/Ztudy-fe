"use client";
import React from "react";
import LeaveRoomButton from "./LeaveRoomButton";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
import { Button } from "@/components/ui/button";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  MonitorOff,
  MonitorPlay,
} from "lucide-react";
import RoomHeader from "./RoomHeader";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Badge } from "@/components/ui/badge";

const MainScreen = ({ roomCode }: { roomCode: string }) => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-background p-3 rounded-lg">
        <RoomHeader />
      </div>
      <div className="flex-1 p-4 rounded-lg bg-white dark:bg-background grid grid-cols-4 gap-1">
        {/* User video and other user videos in here */}
      </div>

      <div className="p-3 rounded-lg bg-white dark:bg-background flex gap-6 justify-center items-center">
        {/* Camera toggle button */}
        {/* <TooltipTemplate content="Camera">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            variant={isVideoEnabled ? "default" : "outline"}
            onClick={() => toggleVideo()}
          >
            {isVideoEnabled ? <Camera /> : <CameraOff />}
          </Button>
        </TooltipTemplate> */}

        {/* Mute toggle button */}
        {/* <TooltipTemplate content="Mute">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            variant={isAudioEnabled ? "default" : "outline"}
            onClick={() => toggleAudio()}
          >
            {isAudioEnabled ? <Mic /> : <MicOff />}
          </Button>
        </TooltipTemplate> */}

        {/* Leave room button */}
        <LeaveRoomButton roomCode={roomCode} />

        {/* Presenting button */}
        {/* <TooltipTemplate content="Presentation">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            variant={isScreenSharing ? "default" : "outline"}
            onClick={() => toggleScreenShare()}
          >
            {isScreenSharing ? <MonitorPlay /> : <MonitorOff />}
          </Button>
        </TooltipTemplate> */}
      </div>
    </div>
  );
};

export default MainScreen;
