import { z } from "zod";

export const monthlyLevelSchema = z.enum([
  "MEMBER",
  "ENTRY",
  "BEGINNER",
  "INTERMEDIATE",
  "PROFICIENT",
  "ADVANCED",
  "EXPERT",
  "A_PLUS_STUDENT",
  "MASTER",
  "GRANDMASTER",
  "STUDY_MACHINE",
  "STUDY_MASTER"
]);

export type MonthlyLevelSchema = z.infer<typeof monthlyLevelSchema>;

export const MonthlyLevelLabels: Record<MonthlyLevelSchema, string> = {
  MEMBER: "Member (0-10m)",
  ENTRY: "Entry (10m-60m)",
  BEGINNER: "Beginner (1-3h)",
  INTERMEDIATE: "Intermediate (3-6h)",
  PROFICIENT: "Proficient (6-10h)",
  ADVANCED: "Advanced (10-20h)",
  EXPERT: "Expert (20-40h)",
  A_PLUS_STUDENT: "A+ Student (40-60h)",
  MASTER: "Master (60-80h)",
  GRANDMASTER: "Grandmaster (80-140h)",
  STUDY_MACHINE: "Study-Machine (140-200h)",
  STUDY_MASTER: "Study Master (200+h)"
};

export const getMonthlyLevelLabel = (level: MonthlyLevelSchema): string => {
  return MonthlyLevelLabels[level];
};
