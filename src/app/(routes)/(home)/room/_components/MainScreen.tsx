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
  MonitorPlay,
} from "lucide-react";

const MainScreen = ({ roomCode }: { roomCode: string }) => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex-1 p-4 rounded-lg bg-white"></div>
      <div className="p-3 rounded-lg bg-white flex gap-6 justify-center items-center">
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
        <TooltipTemplate content="Presentation">
          <Button
            type="button"
            size={"icon"}
            className="rounded-full w-12 h-12 [&_svg]:size-5"
            // variant={cameraEnabled ? "default" : "outline"}
            // onClick={() => setCameraEnabled(!cameraEnabled)}
          >
            <MonitorPlay />
          </Button>
        </TooltipTemplate>
      </div>
      {/* <LeaveRoomButton handleLeaveRoom={handleLeaveRoom} roomCode={roomCode} /> */}
    </div>
  );
};

export default MainScreen;
