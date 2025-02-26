import { z } from "zod";

export const goalSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["ACTIVE", "COMPLETED"]),
});

export type GoalSchema = z.infer<typeof goalSchema>;
