"use client";
import { useSoloContext } from "@/hooks/useSoloContext";
import { UrlToEmbeded } from "@/util/urlToEmbed";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * YouTube Embed Parameters:
 *
 * - start=0               // Bắt đầu video từ giây 0.
 * - loop=1                // Lặp lại video khi kết thúc.
 * - playlist=h2fPDCzNvFo  // Bắt buộc để video có thể lặp lại.
 * - showinfo=0            // Ẩn tiêu đề và thông tin video (không còn hoạt động từ 2018).
 * - controls=0            // Ẩn thanh điều khiển video.
 * - disablekb=0           // Không vô hiệu hóa bàn phím (người dùng vẫn có thể dùng phím để điều khiển).
 * - fs=0                  // Không cho phép xem ở chế độ toàn màn hình.
 * - rel=0                 // Không hiển thị video liên quan khi video kết thúc (từ 2018 chỉ hiển thị video từ cùng kênh).
 * - iv_load_policy=3      // Ẩn chú thích (annotations) trên video.
 * - autoplay=1            // Tự động phát video ngay khi tải trang.
 * - mute=1                // Video tự động tắt tiếng khi phát.
 * - modestbranding=1      // Ẩn logo YouTube trong trình phát video.
 * - playsinline=1         // Phát video trong trang thay vì toàn màn hình trên di động.
 * - enablejsapi=1         // Cho phép điều khiển video qua JavaScript API.
 * - origin=your_url // Chỉ định trang web nhúng video (bảo mật).
 * - widgetid=2            // ID widget để phân biệt trình phát nếu có nhiều video trên trang.
 */

function BackgroundIframe() {
  const [state, dispatch] = useSoloContext();
  const youtubeRef = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  const handleVolumeChange = useCallback(() => {
    if (!videoRef.current) return;

    if (state.volume === 0) {
      videoRef.current.mute();
    } else {
      videoRef.current.unMute();
      videoRef.current.setVolume(state.volume);
    }
  }, [state.volume]);

  useEffect(() => {
    // Function to initialize youtube
    const initializeyoutube = () => {
      if (!state.backgroundURL) {
        console.log("No background URL available yet");
        return;
      }

      const video = UrlToEmbeded(state.backgroundURL);
      if (!video?.videoId) {
        console.log("Invalid video URL or couldn't extract video ID");
        setVideoError(true);
        return;
      }

      try {
        youtubeRef.current = new window.YT.Player("video-youtube", {
          height: "390",
          width: "640",
          videoId: `${video?.videoId}`,
          playerVars: {
            playsinline: 1,
            enablejsapi: 1,
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            mute: 1, // Phải tắt tiếng ban đầu để đáp ứng chính sách autoplay
            rel: 0,
            loop: 1,
            playlist: `${video?.videoId}`,
          },
          events: {
            onReady: (event: any) => {
              videoRef.current = event.target;
              event.target.playVideo();
              setIsPlayerReady(true);
              setVideoError(false);
            },
            onError: (event: any) => {
              console.error("YouTube player error:", event.data);
              setVideoError(true);
            },
          },
        });
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
        setVideoError(true);
      }
    };

    // Check if YouTube API is already loaded
    if (!state.isAddYtbScript) {
      console.log("Loading YouTube API script");
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      dispatch({ type: "SET_ADD_YTB_SCRIPT", payload: true });

      // Set up callback for first load
      (window as any).onYouTubeIframeAPIReady = () => {
        if (state.backgroundURL) {
          initializeyoutube();
        }
      };
    } else if (window.YT && window.YT.Player && state.backgroundURL) {
      // YouTube API is already loaded, initialize youtube directly
      initializeyoutube();
    }
  }, [state.backgroundURL, state.isAddYtbScript, dispatch]);

  useEffect(() => {
    if (videoRef.current && isPlayerReady && state.backgroundURL) {
      const video = UrlToEmbeded(state.backgroundURL);
      if (!video?.videoId) {
        console.log("Invalid video URL or couldn't extract video ID");
        setVideoError(true);
        return;
      }

      try {
        videoRef.current.loadVideoById({
          videoId: `${video?.videoId}`,
          startSeconds: 0,
          endSeconds: 0,
          suggestedQuality: "large",
        });
        videoRef.current.loadPlaylist(video?.videoId);
        videoRef.current.setLoop(true);
        setVideoError(false);
      } catch (error) {
        console.error("Error loading video:", error);
        setVideoError(true);
      }
    }
  }, [state.backgroundURL, isPlayerReady]);

  useEffect(() => {
    if (videoRef.current && isPlayerReady) {
      handleVolumeChange();
    }
  }, [state.volume, isPlayerReady, handleVolumeChange]);

  return (
    <div>
      {videoError && state.backgroundURL && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black/50 p-4 rounded-md z-10">
          Video unavailable. Please try another background.
        </div>
      )}
      <div
        id="video-youtube"
        className="aspect-video min-w-full w-screen object-cover min-h-full box-border h-[56.25vw] pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></div>
    </div>
  );
}

export default React.memo(BackgroundIframe);
