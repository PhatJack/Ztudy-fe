import {
  ChartNoAxesColumn,
  Expand,
  Image,
  Target,
  TextQuote,
  Watch,
} from "lucide-react";
import BackgroundIframe from "./components/BackgroundIframe";
import { Button } from "@/components/ui/button";

export default function Solo() {
  const menuButton: {
    icon: React.ElementType;
    label: string;
  }[] = [
    {
      icon: Image,
      label: "Image",
    },
    {
      icon: TextQuote,
      label: "Text",
    },
    {
      icon: ChartNoAxesColumn,
      label: "Study Stat",
    },
    {
      icon: Expand,
      label: "View fullscreen",
    },
  ];

  return (
    <>
      <BackgroundIframe src="https://www.youtube.com/watch?v=WnY-KZJ0uZg" />
      <div className="relative">
        <div className="relative size-full flex justify-between items-center h-12 mb-4">
          <div className="flex gap-4">
            <div className="shadow-lg h-full px-4 py-0.5 flex flex-col justify-center items-center gap-1 bg-background hover:bg-background/90 cursor-pointer text-foreground  rounded-md">
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {/* <Watch size={16} /> */}
                </div>
                <span className="text-xs font-medium leading-[1.15rem]">
                  Personal timer
                </span>
              </div>
              <p className="text-sm">
                <strong>50:00:00</strong>
              </p>
            </div>
            <div className="shadow-lg h-full px-4 py-0.5 flex flex-col justify-center items-center gap-1 bg-background hover:bg-background/90 cursor-pointer text-foreground rounded-md">
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <Target size={16} />
                </div>
                <span className="text-xs font-medium leading-[1.15rem]">
                  Study goal
                </span>
              </div>
              <p className="text-sm">
                <strong>0 / 1</strong>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {menuButton.map((item, index) => (
              <Button
                key={index}
                title={item.label}
                className="w-12 h-12 hover:bg-background/90 hover:text-foreground"
                variant={"outline"}
                size={"icon"}
              >
                <span className="text-xl">
                  <item.icon />
                </span>
              </Button>
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[calc(100vh-3rem-1rem-2.5rem)] border border-background rounded-md overflow-hidden"></div>
      </div>
    </>
  );
}
