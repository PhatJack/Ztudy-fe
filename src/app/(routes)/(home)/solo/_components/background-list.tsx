"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useSoloContext } from "@/hooks/useSoloContext";
import { Volume2, VolumeX } from "lucide-react";
import React from "react";
import { useCallback } from "react";
import debounce from "lodash.debounce";
const BackgroundList = () => {
  const [state, dispatch] = useSoloContext();

  const debouncedSetVolume = useCallback(
    debounce((val) => {
      dispatch({ type: "SET_VOLUME", payload: val });
    }, 300), // Adjust debounce time (300ms)
    []
  );

  return (
    <div className="w-[267px] min-w-[267px] bg-background rounded-md p-5 shadow-lg flex flex-col space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="youtube-link" className="flex items-center gap-1">
          <span>
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 fill-[#FF0000]"
            >
              <title>YouTube</title>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </span>
          <span>
            <strong>Youtube Video</strong>
          </span>
        </Label>
        <Input
          id="youtube-link"
          placeholder="Paste the youtube link here"
          className="border-muted"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="volume" className="flex items-center gap-1">
          <span>
            <strong>Original Video Sound</strong>
          </span>
        </Label>
        <div className="flex gap-1">
          <span>
            {state.volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </span>
          <Slider
            id="volume"
            step={1}
            min={0}
            max={100}
            onValueChange={(value) => debouncedSetVolume(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BackgroundList);
