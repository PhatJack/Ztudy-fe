import { z } from "zod";
import { baseSchema } from "../base.schema";

export const userSchema = baseSchema.extend({
  id: z.number(),
  pk: z.number(),
  email: z.string().email("Invalid email"),
  password: z.string(),
  last_login: z.date(),
  is_superuser: z.boolean(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  is_staff: z.boolean(),
  date_joined: z.date(),
  avatar: z.string().nullable(),
  restored_at: z.date().nullable(),
  transaction_id: z.string().nullable(),
});

export type UserSchema = z.infer<typeof userSchema>;
