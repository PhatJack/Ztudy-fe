// https://www.googleapis.com/youtube/v3/videos?id=wy3PFkngtUs&key=YOUR_API_KEY&part=snippet,statistics

import { YouTubeErrorResponse } from "@/lib/schemas/youtube/youtube-error-response.schema";
import { YouTubeResponse } from "@/lib/schemas/youtube/youtube-response.schema";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export async function getDetailYoutubeApi(
  id: string | undefined
): Promise<YouTubeResponse> {
  const response = await axios.get<YouTubeResponse>(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_V3}&part=snippet,statistics`
  );
  return response.data;
}

export function useGetDetailYoutubeApi(videoId: string | undefined) {
  const queryKey = ["youtube-detail-video-api", videoId] as const;

  return queryOptions<YouTubeResponse, YouTubeErrorResponse>({
    queryKey: queryKey,
    enabled: !!videoId,
    queryFn: () => getDetailYoutubeApi(videoId),
  });
}
