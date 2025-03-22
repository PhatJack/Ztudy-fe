import { z } from "zod";
import { baseSchema } from "../base.schema";
import { monthlyLevelSchema } from "../monthly-level.schema";

export const userSchema = baseSchema.extend({
  id: z.number(),
  avatar: z.string().nullable(),
  last_login: z.coerce.date(),
  username: z.string(),
  first_name: z.string(),
  email: z.string().email("Invalid email"),
  last_name: z.string(),
  password: z.string(),
  is_online: z.boolean(),
  is_active: z.boolean(),
  date_joined: z.coerce.date(),
	monthly_study_time: z.number(),
  monthly_level: monthlyLevelSchema
});


export type UserSchema = z.infer<typeof userSchema>;
