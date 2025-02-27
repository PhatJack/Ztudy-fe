import BackgroundIframe from "./_components/BackgroundIframe";
import QuoteDisplay from "./_components/quote-display";
import StickyContainer from "./_components/sticky-container";
import StickyMenu from "./_components/sticky-menu";

export default function Solo() {
  return (
    <>
      <BackgroundIframe src="https://www.youtube.com/watch?v=h2fPDCzNvFo" />
      <div className="relative">
        <div className="relative size-full flex justify-between items-center h-12 mb-4">
          <StickyMenu />
        </div>
        <div className="sticky top-0 h-[calc(100vh-3rem-1rem-2.5rem)] rounded-md overflow-hidden">
          <StickyContainer />
          <QuoteDisplay />
        </div>
      </div>
    </>
  );
}
