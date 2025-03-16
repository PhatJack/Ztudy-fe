import { z } from "zod";

export const studyRoomCategoriesSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type StudyRoomCategoriesSchema = z.infer<typeof studyRoomCategoriesSchema>;
