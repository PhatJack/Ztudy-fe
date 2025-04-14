import { z } from "zod";

export const userFavoriteVideoSchema = z.object({
  id: z.number(),
  image: z.string().nullable(),
  youtube_url: z.string(),
  user: z.coerce.number(),
  name: z.string(),
  created_at: z.string(),
});

export type UserFavoriteVideoSchema = z.infer<typeof userFavoriteVideoSchema>;
