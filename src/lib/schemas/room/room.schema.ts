import { z } from "zod";

export const roomType = z.enum(["PUBLIC", "PRIVATE"]);

export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
  code_invite: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  is_active: z.boolean(),
  creator_user: z.number(),
  category: z.coerce.number(),
  max_participants: z.number(),
  type: roomType,
  thumbnail: z.string().nullable(),
});

export type RoomSchema = z.infer<typeof roomSchema>;
