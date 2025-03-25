import { MonthlyLevelSchema } from "@/lib/schemas/monthly-level.schema";

export const levels = [
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
  "STUDY_MASTER",
];


export const levelBorders: {
  border: string;
  level: MonthlyLevelSchema;
}[] = [
  {
    border: "/borders/1.webp",
    level: "MEMBER",
  },
  {
    border: "/borders/2.webp",
    level: "ENTRY",
  },
  {
    border: "/borders/3.webp",
    level: "BEGINNER",
  },
  {
    border: "/borders/4.webp",
    level: "INTERMEDIATE",
  },
  {
    border: "/borders/5.webp",
    level: "PROFICIENT",
  },
  {
    border: "/borders/6.webp",
    level: "ADVANCED",
  },
  {
    border: "/borders/7.webp",
    level: "EXPERT",
  },
  {
    border: "/borders/8.webp",
    level: "A_PLUS_STUDENT",
  },
  {
    border: "/borders/9.webp",
    level: "MASTER",
  },
  {
    border: "/borders/10.webp",
    level: "GRANDMASTER",
  },
  {
    border: "/borders/11.webp",
    level: "STUDY_MACHINE",
  },
  {
    border: "/borders/12.webp",
    level: "STUDY_MASTER",
  },
];
