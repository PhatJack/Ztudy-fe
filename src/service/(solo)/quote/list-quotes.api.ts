import { apiClient } from "@/lib/client";
import { createListResponseSchema } from "@/lib/schemas/pagination.schema";
import { quoteSchema } from "@/lib/schemas/quote/quote.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";

export const quoteResponseBodySchema = createListResponseSchema(quoteSchema);

export type QuoteResponseBodySchema = z.infer<typeof quoteResponseBodySchema>;

export async function listQuotesApi(): Promise<QuoteResponseBodySchema> {
  const response = await apiClient.get("/motivational-quotes/");
  return quoteResponseBodySchema.parse(response.data);
}

export function useListQuotes() {
  const queryKey = ["motivational-quotes"] as const;

  return queryOptions<QuoteResponseBodySchema>({
    queryKey,
    queryFn: listQuotesApi,
    throwOnError: isAxiosError,
  });
}
