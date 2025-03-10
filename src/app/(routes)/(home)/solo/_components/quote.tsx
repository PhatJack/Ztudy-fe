"use client";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motivationalQuotes } from "@/constants/quotes";
import { useSoloContext } from "@/hooks/useSoloContext";
import { useListQuotes } from "@/service/(solo)/quote/list-quotes.api";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff, MessageSquareQuote, RefreshCcw, X } from "lucide-react";
import React, { useCallback } from "react";

const Quote = () => {
  const quotesQuery = useQuery(useListQuotes());

  const quotes = quotesQuery.data?.results;

  const [state, dispatch] = useSoloContext();

  const randomQuote = useCallback(() => {
    const quote = quotes
      ? quotes[Math.floor(Math.random() * quotes.length)]
      : {
          quote: "Success is the sum of small efforts, repeated day in and day out.",
          author: "Robert Collier",
        };
    dispatch({
      type: "SHUFFLE_QUOTE",
      payload: { content: quote.quote, author: quote.author },
    });
  }, [dispatch]);

  const toggleDisplay = useCallback(() => {
    dispatch({ type: "TOGGLE_QUOTE" });
  }, [dispatch]);

  return (
    <div className="w-[267px] min-w-[267px] p-5 rounded-md bg-background shadow-lg">
      {quotesQuery.isLoading && quotesQuery.isFetching ? (
        <div className="w-full h-[100px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : null}
      {quotesQuery.data && quotesQuery.data.results ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span>
                <MessageSquareQuote size={14} className="mr-1" />
              </span>
              <span className="text-sm">Motivational Quote</span>
            </div>
            <Button
              type="button"
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_PANEL", payload: "quote" })
              }
              variant={"ghost"}
              size={"icon"}
              className="w-6 h-6"
            >
              <X size={16} />
            </Button>
          </div>
          <Separator />
          <div
            onClick={randomQuote}
            className="flex items-center gap-1 mb-1 mt-3 cursor-pointer font-semibold hover:text-primary"
          >
            <RefreshCcw size={14} />
            <span className="text-sm">Shuffle</span>
          </div>
          <div
            onClick={toggleDisplay}
            className="flex items-center gap-1 cursor-pointer font-semibold hover:text-primary"
          >
            {state.isDisplayQuote ? (
              <>
                <EyeOff size={14} />
                <span className="text-sm">Hide</span>
              </>
            ) : (
              <>
                <Eye size={14} />
                <span className="text-sm">Show</span>
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Quote;
