import { z } from "zod";

export const userSchema = z.object({
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
});

export type UserSchema = z.infer<typeof userSchema>;
