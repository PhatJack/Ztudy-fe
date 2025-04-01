import React from "react";
import BackgroundIframe from "./BackgroundIframe";
import StickyMenu from "./sticky-menu";
import StickyContainer from "./sticky-container";
import QuoteDisplay from "./quote-display";

const SoloPage = () => {
  return (
    <>
      <BackgroundIframe />
      <div className="relative">
        <div className="relative size-full flex justify-between items-center h-12 mb-4">
          <StickyMenu />
        </div>
        <div className="sticky top-0 h-[calc(100vh-3rem-1rem-2.5rem-0.5rem)] rounded-md overflow-hidden">
          <StickyContainer />
          <QuoteDisplay />
        </div>
      </div>
    </>
  );
};

export default SoloPage;
