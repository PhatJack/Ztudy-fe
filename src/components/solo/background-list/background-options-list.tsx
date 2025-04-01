import { Skeleton } from "@/components/ui/skeleton";
import { useSoloContext } from "@/hooks/useSoloContext";
import { useListBackgroundVideos } from "@/service/(solo)/background/list-background-videos.api";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  activeTab: number;
}

const BackgroundOptionsList = ({ activeTab }: Props) => {
  const [state, dispatch] = useSoloContext();
  const backgroundVideosQuery = useQuery(
    useListBackgroundVideos({ type: activeTab })
  );

  const backgroundVideos = backgroundVideosQuery.data?.results;

  const handleClick = (youtubeCode: string) => {
    dispatch({ type: "SET_BACKGROUND", payload: youtubeCode });
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {backgroundVideosQuery.isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <Skeleton className="size-14" key={i} />
          ))
        : null}
      {backgroundVideos?.length === 0 && (
        <div className="text-xs text-gray-800">
          No background videos found for this category
        </div>
      )}
      {backgroundVideosQuery.isSuccess &&
        backgroundVideos?.map((backgroundVideo) => (
          <div
            key={backgroundVideo.id}
            onClick={() => handleClick(backgroundVideo.youtube_url)}
            className="size-14 rounded-md relative overflow-hidden cursor-pointer"
          >
            <Image fill src={backgroundVideo.image} alt={"video youtube"} />
            {state.backgroundURL === backgroundVideo.youtube_url ? (
              <div className="absolute inset-0 bg-black/20 flex justify-center items-center">
                <Check size={26} className="text-white" />
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default BackgroundOptionsList;
