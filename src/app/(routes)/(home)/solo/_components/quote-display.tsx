"use client";
import { useSoloContext } from "@/hooks/useSoloContext";
import React from "react";

const QuoteDisplay = () => {
  const [state] = useSoloContext();

  return state.isDisplayQuote ? (
    <div className="absolute top-3/4 right-0 md:top-[40%] md:right-10 text-center w-full md:w-[500px] md:text-right flex flex-col gap-1 text-white pointer-events-none select-none">
      <p
        className="text-2xl font-bold"
        style={{ textShadow: "rgba(12, 4, 3, 0.5) -6px 6px 6px" }}
      >
        <i>{`"${state.quote?.content}"`}</i>
      </p>
      <span
        className="text-sha"
        style={{ textShadow: "rgba(12, 4, 3, 0.5) -6px 6px 6px" }}
      >
        <i>{state.quote?.author}</i>
      </span>
    </div>
  ) : null;
};

export default React.memo(QuoteDisplay);
