import { Input } from "@/components/ui/input";
import BackgroundIframe from "./components/BackgroundIframe";

export default function Solo() {
  return (
    <>
      <BackgroundIframe src="https://www.youtube.com/watch?v=PsVEpKthrcg" />
      <div className="relative size-full">
        <div className="absolute top-0 left-0">
          <Input className="w-36 bg-white" />
        </div>
      </div>
    </>
  );
}
