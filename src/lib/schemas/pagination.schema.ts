import { z } from "zod";

// Defines a generic pagination response schema where T is the type of each result item
export const paginationResponseSchema = z.object({
  count: z.number().positive().int(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
});

export function createListResponseSchema<T>(ItemSchema: z.ZodType<T>) {
  return paginationResponseSchema.merge(
    z.object({
      results: z.array(ItemSchema),
    })
  );
}

export const paginationRequestSchema = z.object({
  page: z.number().int().positive().optional(),
  page_size: z.number().int().positive().optional(),
  search: z.string().optional(),
  ordering: z.string().optional(),
});
