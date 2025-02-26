import { PanelType } from "@/contexts/SoloContext";
import { ChartNoAxesColumn, Image, TextQuote } from "lucide-react";

interface MenuButton {
  icon: React.ElementType;
  label: string;
  variable: PanelType;
}

export const menuButton: MenuButton[] = [
  {
    icon: Image,
    label: "Image",
    variable: "backgroundIframe",
  },
  {
    icon: TextQuote,
    label: "Text",
    variable: "quote",
  },
  {
    icon: ChartNoAxesColumn,
    label: "Study Stat",
    variable: "studyStats",
  }
];
