import { Skeleton } from "@/components/ui/skeleton";
import { useSoloContext } from "@/hooks/useSoloContext";
import { useListBackgroundVideos } from "@/service/(solo)/background/list-background-videos.api";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  activeTab: number;
}

const BackgroundOptionsList = ({ activeTab }: Props) => {
  const [state, dispatch] = useSoloContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const backgroundVideosQuery = useQuery({
    ...useListBackgroundVideos({ type: activeTab }),
    refetchOnWindowFocus: false,
  });

  const backgroundVideos = backgroundVideosQuery.data?.results;

  const handleClick = (youtubeCode: string) => {
    if (youtubeCode === state.backgroundURL) return; // Skip if already selected

    setIsLoading(true);
    dispatch({ type: "SET_BACKGROUND", payload: youtubeCode });

    // Reset loading state after a delay to allow video to load
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full grid grid-cols-4 gap-1 ">
      {backgroundVideosQuery.isLoading
        ? Array.from({ length: 9 }).map((_, i) => (
            <Skeleton className="size-14" key={i} />
          ))
        : null}
      {backgroundVideos?.length === 0 && (
        <div className="text-xs text-gray-800 col-span-4">
          No background videos found for this category
        </div>
      )}
      {backgroundVideosQuery.isSuccess &&
        backgroundVideos?.map((backgroundVideo) => (
          <div
            key={backgroundVideo.id}
            onClick={() => handleClick(backgroundVideo.youtube_url)}
            className="w-full aspect-square rounded-md relative overflow-hidden cursor-pointer"
          >
            <Image
              fill
              src={
                backgroundVideo.image ??
                `https://img.youtube.com/vi/${
                  backgroundVideo.youtube_url.split("v=")[1]
                }/1.jpg`
              }
              quality={75}
              className="bg-muted"
              alt={"video youtube"}
              sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
            />
            {state.backgroundURL === backgroundVideo.youtube_url ? (
              <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
                {isLoading ? (
                  <Loader2 size={20} className="text-white animate-spin" />
                ) : (
                  <Check size={26} className="text-white" />
                )}
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default BackgroundOptionsList;
