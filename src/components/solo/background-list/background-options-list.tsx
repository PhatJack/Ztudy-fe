import { Skeleton } from "@/components/ui/skeleton";
import { useListBackgroundVideos } from "@/service/(solo)/background/list-background-videos.api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

interface Props {
  activeTab: number;
}

const BackgroundOptionsList = ({ activeTab }: Props) => {
  const backgroundVideosQuery = useQuery(
    useListBackgroundVideos({ type: activeTab })
  );

  const backgroundVideos = backgroundVideosQuery.data?.results;

  return (
    <div className="flex flex-wrap gap-1">
      {backgroundVideosQuery.isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <Skeleton className="size-16" key={i} />
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
            className="size-16 rounded-md relative overflow-hidden"
          >
            <Image fill src={"/daddy-chill.gif"} alt={"video youtube"} />
          </div>
        ))}
    </div>
  );
};

export default BackgroundOptionsList;
