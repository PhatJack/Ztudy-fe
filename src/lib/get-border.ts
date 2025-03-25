import { levelBorders } from "@/constants/level-borders";
import {
  MonthlyLevelLabels,
  MonthlyLevelSchema,
} from "./schemas/monthly-level.schema";

export const getMonthlyLevelLabel = (level: MonthlyLevelSchema): string => {
  return MonthlyLevelLabels[level];
};

export const getMonthlyLevelBorder = (level: MonthlyLevelSchema): string => {
  return levelBorders.find((item) => item.level === level)?.border ?? "";
};
