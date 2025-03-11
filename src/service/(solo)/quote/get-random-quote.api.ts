import { apiClient } from "@/lib/client";
import { quoteSchema } from "@/lib/schemas/quote/quote.schema";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { z } from "zod";
export const getRandomQuoteResponseBodySchema = quoteSchema;

export type GetRandomQuoteResponseBodySchema = z.infer<
  typeof getRandomQuoteResponseBodySchema
>;

export async function getRandomQuoteApi(): Promise<GetRandomQuoteResponseBodySchema> {
  const res = await apiClient.get<GetRandomQuoteResponseBodySchema>(
    "/motivational-quotes/random-quote/"
  );
  return res.data;
}

export function useGetRandomQuote() {
  return queryOptions<GetRandomQuoteResponseBodySchema>({
    queryKey: ["get-random-quote"],
    queryFn: getRandomQuoteApi,
    throwOnError: isAxiosError,
  });
}
