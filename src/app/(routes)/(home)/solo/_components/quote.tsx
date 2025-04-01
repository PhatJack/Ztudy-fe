"use client";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSoloContext } from "@/hooks/useSoloContext";
import { useGetRandomQuote } from "@/service/(solo)/quote/get-random-quote.api";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff, MessageSquareQuote, RefreshCcw, X } from "lucide-react";
import React, { useCallback, useEffect } from "react";

const Quote = () => {
  const quotesQuery = useQuery(useGetRandomQuote());

  const quote = quotesQuery.data;

  const [state, dispatch] = useSoloContext();

  const randomQuote = useCallback(async () => {
    await quotesQuery.refetch();
  }, [dispatch, quotesQuery]);

  const toggleDisplay = useCallback(() => {
    dispatch({ type: "TOGGLE_QUOTE" });
  }, [dispatch]);

  useEffect(() => {
    if (quote) {
      dispatch({
        type: "SHUFFLE_QUOTE",
        payload: { content: quote.quote ?? "", author: quote.author ?? "" },
      });
    }
  }, [quotesQuery.data, dispatch]);

  return (
    <div className="w-[267px] min-w-[267px] p-5 rounded-md bg-background shadow-lg">
      {quotesQuery.isLoading && quotesQuery.isFetching ? (
        <div className="w-full h-[100px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : null}
      {quotesQuery.data ? (
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
