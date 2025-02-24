export function UrlToEmbeded(url: string) {
  if (!url) {
    return undefined;
  }
  let newURl = url.replace("watch?v=", "embed/");
  let videoId = newURl.split("/").pop();
  return (
    newURl +
    `?autoplay=1&enablejsapi=1&start=0&loop=1&controls=0&modestbranding=1&enablejsapi=1&playsinline=1&playlist=${videoId}`
  );
}
