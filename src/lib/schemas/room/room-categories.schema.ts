import { z } from "zod";

export const roomCategoriesSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type RoomCategoriesSchema = z.infer<typeof roomCategoriesSchema>;
