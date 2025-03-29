import LoadingSpinner from "@/components/loading/loading-spinner";
import VolumeChange from "@/components/solo/volume-change";
import { Label } from "@/components/ui/label";
import { useSoloContext } from "@/hooks/useSoloContext";
import { useSoloSoundContext } from "@/hooks/useSoloSoundContext";
import { useListSounds } from "@/service/(solo)/list-sounds.api";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";

const SoundList = () => {
  const [state, dispatch] = useSoloContext();
  const [stateSound, dispatchSound] = useSoloSoundContext();
  const soundsQuery = useQuery(useListSounds());

  const sounds = soundsQuery.data?.results;

  // Initialize sounds
  useEffect(() => {
    if (!sounds || stateSound.isInitialized) return;
    
    if (state.activeSounds && state.activeSounds.length > 0) {
      // Use saved sounds from SoloContext
      dispatchSound({
        type: "SET_SOUNDS",
        payload: state.activeSounds,
      });
    } else if (sounds) {
      // Initialize with default values
      dispatchSound({
        type: "SET_SOUNDS",
        payload: sounds.map((sound) => ({
          stream_url: sound.stream_url,
          sound_name: sound.name,
          volume: 0,
        })),
      });
    }
    
    // Mark as initialized
    dispatchSound({ type: "SET_INITIALIZED", payload: true });
  }, [sounds, dispatchSound, state.activeSounds, stateSound.isInitialized]);

  // Save sounds to SoloContext whenever they change
  useEffect(() => {
    if (stateSound.sounds && stateSound.sounds.length > 0) {
      dispatch({
        type: "SAVE_ACTIVE_SOUNDS",
        payload: stateSound.sounds
      });
    }
  }, [stateSound.sounds, dispatch]);

  // Handle volume change
  const handleVolumeChange = useCallback(
    (stream_url: string, volume: number) => {
      dispatchSound({
        type: "UPDATE_VOLUME",
        payload: { stream_url, volume },
      });
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
              handleVolumeChange(sound.stream_url, val[0])
            }
            volume={sound.volume}
            handleMute={() =>
              handleVolumeChange(sound.stream_url, sound.volume > 0 ? 0 : 1)
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
