"use client";
import LoadingSpinner from "@/components/loading/loading-spinner";
import VolumeChange from "@/components/solo/volume-change";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useSoloContext } from "@/hooks/useSoloContext";
import { useListSounds } from "@/service/(solo)/list-sounds.api";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { Info, Volume2, VolumeX } from "lucide-react";
import React, { useCallback, useState } from "react";
const SoundList = () => {
  const [state, dispatch] = useSoloContext();
  const soundsQuery = useQuery(useListSounds());

  const sounds = soundsQuery.data?.results;

  const debouncedSetVolume = useCallback(
    (val: number[]) => {
      dispatch({ type: "SET_VOLUME", payload: val[0] });
    },
    [dispatch]
  );

  const handleMute = useCallback(() => {
    dispatch({ type: "SET_VOLUME", payload: state.volume > 0 ? 0 : 100 });
  }, [state.volume, dispatch]);

  return (
    <div className="w-[267px] min-w-[267px] bg-background rounded-md p-5 shadow-lg flex flex-col space-y-2">
      <div className="flex flex-col">
        <Label htmlFor="volume" className="flex items-center gap-1 text-xs">
          <span>
            <strong>Original Video Sound</strong>
          </span>
        </Label>
        <VolumeChange
          debouncedSetVolume={debouncedSetVolume}
          volume={state.volume}
          handleMute={handleMute}
        />
      </div>
      {sounds &&
        sounds.map((sound, index) => (
          <div key={index} className="flex flex-col">
            <Label htmlFor="volume" className="flex items-center gap-1 text-xs">
              <span>
                <strong>{sound.name}</strong>
              </span>
            </Label>
            <VolumeChange
              debouncedSetVolume={debouncedSetVolume}
              volume={state.volume}
              handleMute={handleMute}
            />
          </div>
        ))}
      {soundsQuery.isLoading && soundsQuery.isFetching && (
        <div className="w-full h-[200px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default React.memo(SoundList);
