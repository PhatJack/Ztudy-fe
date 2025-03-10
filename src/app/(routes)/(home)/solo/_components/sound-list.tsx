import LoadingSpinner from "@/components/loading/loading-spinner";
import VolumeChange from "@/components/solo/volume-change";
import { Label } from "@/components/ui/label";
import { useSoloContext } from "@/hooks/useSoloContext";
import { useSoloSoundContext } from "@/hooks/useSoloSoundContext";
import { useListSounds } from "@/service/(solo)/list-sounds.api";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";

const SoundList = () => {
  const [state, dispatch] = useSoloContext();
  const [stateSound, dispatchSound] = useSoloSoundContext();
  const soundsQuery = useQuery(useListSounds());

  const sounds = soundsQuery.data?.results;
  const audioMap = useRef(new Map<string, HTMLAudioElement>()); // Persist audio instances

  // Initialize sounds
  useEffect(() => {
    if (sounds) {
      dispatchSound({
        type: "SET_SOUNDS",
        payload: sounds.map((sound) => ({
          sound_file: sound.sound_file,
          sound_name: sound.name,
          volume: 0,
        })),
      });

      sounds.forEach((sound) => {
        if (!audioMap.current.has(sound.sound_file)) {
          const audio = new Audio(sound.sound_file);
          audio.volume = 0;
					audio.play();
          audioMap.current.set(sound.sound_file, audio);
        }
      });
    }
  }, [sounds, dispatchSound]);

  // Handle volume change
  const handleVolumeChange = useCallback(
    (sound_file: string, volume: number) => {
      dispatchSound({
        type: "UPDATE_VOLUME",
        payload: { sound_file, volume },
      });

      const audio = audioMap.current.get(sound_file);
      if (audio) {
        audio.volume = volume;
      }
    },
    [dispatchSound]
  );

  return (
    <div className="w-[267px] min-w-[267px] bg-background rounded-md p-5 shadow-lg flex flex-col space-y-2">
      <div className="flex flex-col">
        <Label htmlFor="volume" className="flex items-center gap-1 text-xs">
          <span>
            <strong>Original Video Sound</strong>
          </span>
        </Label>
        <VolumeChange
          debouncedSetVolume={(val) =>
            dispatch({ type: "SET_VOLUME", payload: val[0] })
          }
          volume={state.volume}
          handleMute={() =>
            dispatch({
              type: "SET_VOLUME",
              payload: state.volume > 0 ? 0 : 100,
            })
          }
        />
      </div>
      {stateSound.sounds?.map((sound, index) => (
        <div key={index} className="flex flex-col">
          <Label htmlFor="volume" className="flex items-center gap-1 text-xs">
            <span>
              <strong>{sound.sound_name}</strong>
            </span>
          </Label>
          <VolumeChange
            step={0.1}
            minValue={0}
            maxValue={1}
            debouncedSetVolume={(val) =>
              handleVolumeChange(sound.sound_file, val[0])
            }
            volume={sound.volume}
            handleMute={() =>
              handleVolumeChange(sound.sound_file, sound.volume > 0 ? 0 : 1)
            }
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
