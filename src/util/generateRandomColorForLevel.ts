import { MonthlyLevelSchema } from "@/lib/schemas/monthly-level.schema";

type ColorTheme = {
  light: string;
  dark: string;
};
export const getLevelColor = (
  level: MonthlyLevelSchema,
  theme: "light" | "dark"
): string => {
  const colorMap: Record<MonthlyLevelSchema, ColorTheme> = {
    MEMBER: { dark: "#FFD1DC", light: "#FF6B8B" }, // Playful Pink
    ENTRY: { dark: "#FFECB3", light: "#FFC107" }, // Energetic Amber
    BEGINNER: { dark: "#B3E5FC", light: "#03A9F4" }, // Refreshing Blue
    INTERMEDIATE: { dark: "#C8E6C9", light: "#4CAF50" }, // Organic Green
    PROFICIENT: { dark: "#FFCC80", light: "#FF9800" }, // Warm Orange (replaced brown)
    ADVANCED: { dark: "#B39DDB", light: "#7E57C2" }, // Cosmic Purple
    EXPERT: { dark: "#F8BBD0", light: "#F06292" }, // Vibrant Pink
    A_PLUS_STUDENT: { dark: "#80DEEA", light: "#26C6DA" }, // Electric Cyan
    MASTER: { dark: "#FFAB91", light: "#FF7043" }, // Fiery Coral
    GRANDMASTER: { dark: "#E6EE9C", light: "#D4E157" }, // Neon Lime
    STUDY_MACHINE: {
      dark: "#CE93D8", // Cyber Purple (dark)
      light: "#AB47BC", // Plasma Violet (dark)
    },
    STUDY_MASTER: {
      dark: "#EF9A9A",
      light: "#EF5350", // Heroic Red
    },
  };
  return colorMap[level][theme];
};
