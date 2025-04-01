import { z } from "zod";

export const changePasswordSchema = z
  .object({
		old_password: z.string(),
    new_password1: z.string().min(8),
    new_password2: z.string().min(8),
  })
  .refine((data) => data.new_password1 === data.new_password2, {
    message: "New password don't match.",
    path: ["new_password1"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
