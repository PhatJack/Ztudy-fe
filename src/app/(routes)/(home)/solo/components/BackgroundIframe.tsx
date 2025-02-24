import { UrlToEmbeded } from "@/util/urlToEmbed";

interface Props {
  src: string;
}
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

export default function BackgroundIframe({ src }: Props) {
  return (
    <div>
      <iframe
        id="video-player"
        width={640}
        height={360}
        src={UrlToEmbeded(src)}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video min-w-full w-screen object-cover min-h-full box-border h-[56.25vw] pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></iframe>
    </div>
  );
}
