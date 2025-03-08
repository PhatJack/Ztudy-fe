import { z } from "zod";

// Defines a generic pagination response schema where T is the type of each result item
export const PaginationResponseSchema = z.object({
  count: z.number(),           // Total number of items (required number)
  next: z.string().nullable(), // URL to next page (string or null)
  previous: z.string().nullable(), // URL to previous page (string or null)
})

export function createListResponseSchema<T>(ItemSchema: z.ZodType<T>) {
	return PaginationResponseSchema.merge(z.object({
		results: z.array(ItemSchema), // Array of items (required array)
	}))
}