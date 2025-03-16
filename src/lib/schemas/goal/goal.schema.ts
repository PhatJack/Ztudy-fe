import { z } from "zod";

export const goalSchema = z.object({
  id: z.number(),
  goal: z.string(),
  status: z.enum(["OPEN", "COMPLETED"]),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  user: z.number(),
});

export type GoalSchema = z.infer<typeof goalSchema>;
