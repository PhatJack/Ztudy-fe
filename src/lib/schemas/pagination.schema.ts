import { z } from "zod";

// Defines a generic pagination response schema where T is the type of each result item
export const paginationResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
});

export function createListResponseSchema<T>(ItemSchema: z.ZodType<T>) {
  return paginationResponseSchema.merge(
    z.object({
      results: z.array(ItemSchema).catch([]),
    })
  );
}

export type PaginationResponseSchema<T> = z.infer<typeof paginationResponseSchema>;

export const paginationRequestSchema = z.object({
  page: z.number().int().positive().optional(),
  page_size: z.number().int().positive().optional(),
  search: z.string().optional(),
  ordering: z.string().optional(),
});

export type PaginationRequestSchema = z.infer<typeof paginationRequestSchema>;

export const keyParamsSchema = z.record(z.string(), z.any());

export type KeyParamsSchema = z.infer<typeof keyParamsSchema>;