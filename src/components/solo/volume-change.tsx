import React from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Volume2, VolumeX } from "lucide-react";

interface Props {
  volume: number;
  handleMute: () => void;
  debouncedSetVolume: (val: number[]) => void;
}

const VolumeChange = ({ debouncedSetVolume, handleMute, volume }: Props) => {
  return (
    <div className="flex gap-1">
      <Button
        type="button"
        onClick={handleMute}
        size={"icon"}
        variant={"ghost"}
        className="hover:bg-transparent hover:text-black"
      >
        {volume > 0 ? <Volume2 /> : <VolumeX />}
      </Button>
      <Slider
        id="volume"
        step={1}
        min={0}
        max={100}
        value={[volume]}
        onValueChange={(value) => debouncedSetVolume(value)}
      />
    </div>
  );
};

export default VolumeChange;
