"use client";
import { cn } from "@/lib/utils";
import { MicOff } from "lucide-react";
import React, { useRef, memo } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 480,
  facingMode: "user",
};

interface Props {
  cameraEnabled?: boolean;
  micEnabled?: boolean;
  className?: string;
}

const CameraDisplay = ({
  cameraEnabled = true,
  micEnabled,
  className,
}: Props) => {
  const webcamRef = useRef<Webcam>(null);

  return (
    <div
      className={cn(
        "w-[400px] h-[260px] rounded-lg bg-background overflow-hidden relative border",
        className
      )}
    >
      {cameraEnabled ? (
        <Webcam
          audio={false}
          width={540}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="absolute inset-0"
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="font-bold">Camera is disabled</p>
        </div>
      )}
      {!micEnabled ? (
        <div className="absolute top-3 left-3 size-10 p-2.5 border bg-background flex justify-center items-center rounded-full">
          <MicOff />
        </div>
      ) : null}
    </div>
  );
};

export default memo(CameraDisplay);
