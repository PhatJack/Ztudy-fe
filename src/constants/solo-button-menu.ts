import { ChartNoAxesColumn, Expand, Image, TextQuote } from "lucide-react";

interface MenuButton {
  icon: React.ElementType;
  label: string;
	variable: string;
}

export const menuButton: MenuButton[] = [
  {
    icon: Image,
    label: "Image",
		variable: "isOpenBackgroundIframe",
  },
  {
    icon: TextQuote,
    label: "Text",
		variable: "isOpenQuote",
  },
  {
    icon: ChartNoAxesColumn,
    label: "Study Stat",
		variable: "isOpenStudyStats",
  },
  {
    icon: Expand,
    label: "View fullscreen",
		variable: "isOpenFullscreen",
  },
];
