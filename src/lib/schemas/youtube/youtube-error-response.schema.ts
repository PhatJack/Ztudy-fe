import { z } from "zod";

const ErrorDetailSchema = z.object({
  "@type": z.string(),
  reason: z.string().optional(),
  domain: z.string().optional(),
  metadata: z.record(z.string()).optional(),
  locale: z.string().optional(),
  message: z.string().optional(),
});

const ErrorItemSchema = z.object({
  message: z.string(),
  domain: z.string(),
  reason: z.string(),
});

export const YouTubeErrorResponseSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
    errors: z.array(ErrorItemSchema),
    status: z.string(),
    details: z.array(ErrorDetailSchema).optional(),
  }),
});

export type YouTubeErrorResponse = z.infer<typeof YouTubeErrorResponseSchema>;