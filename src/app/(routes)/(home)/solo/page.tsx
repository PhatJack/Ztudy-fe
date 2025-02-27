"use client";
import BackgroundIframe from "./_components/BackgroundIframe";
import StickyContainer from "./_components/sticky-container";
import StickyMenu from "./_components/sticky-menu";

export default function Solo() {
  return (
    <>
      <BackgroundIframe src="https://www.youtube.com/watch?v=ntLop32pYd0&list=RD8D9d9weVQnI&index=2" />
      <div className="relative">
        <div className="relative size-full flex justify-between items-center h-12 mb-4">
          <StickyMenu />
        </div>
        <div className="sticky top-0 h-[calc(100vh-3rem-1rem-2.5rem)] rounded-md overflow-hidden">
          <StickyContainer />
        </div>
      </div>
    </>
  );
}
