import { z } from "zod";

export const userFavoriteVideoSchema = z.object({
  id: z.number(),
  image: z.string().nullable(),
  youtube_url: z.string(),
  user: z.number(),
});

export type UserFavoriteVideoSchema = z.infer<typeof userFavoriteVideoSchema>;
