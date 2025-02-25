export function UrlToEmbeded(
  url: string
): { videoId: string; embedUrl: string } | undefined {
  if (!url || typeof url !== "string") {
    return undefined;
  }

  // Regular expression to extract the video ID from common YouTube URL formats
  const videoIdMatch = url.match(
    /(?:watch\?v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/
  );
  if (!videoIdMatch || !videoIdMatch[1]) {
    return undefined; // Return undefined if no valid video ID is found
  }

  const videoId = videoIdMatch[1];
  const embedBase = `https://www.youtube.com/embed/${videoId}`;

  // Build the URL with query parameters
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    enablejsapi: "1",
    start: "0",
    loop: "1",
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    widgetid: "2",
    playlist: videoId, // Required for loop to work with a single video
  });

  const embedUrl = `${embedBase}?${params.toString()}`;

  return { videoId, embedUrl };
}
