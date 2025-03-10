import { z } from "zod";

export const goalSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["OPEN", "COMPLETED"]),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
	user_id: z.number().optional(),
});

export type GoalSchema = z.infer<typeof goalSchema>;
