import { z } from "zod";

export const validationErrorResponseSchema = z.object({
  statusCode: z.coerce.number(),
  message: z.record(z.array(z.string())),
  error: z.string(),
});
export type ValidationErrorResponseSchema = z.infer<
  typeof validationErrorResponseSchema
>;
