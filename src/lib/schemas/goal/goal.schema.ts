import { z } from "zod";

export const goalSchema = z.object({
  id: z.number(),
  goal: z.string(),
  status: z.enum(["OPEN", "COMPLETED"]),
  updated_at: z.coerce.date(),
  user: z.number().optional(),
});

export type GoalSchema = z.infer<typeof goalSchema>;
