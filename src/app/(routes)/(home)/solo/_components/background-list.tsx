"use client";
import BackgroundTypesList from "@/components/solo/background-list/background-types-list";
import YoutubeLinkInput from "@/components/solo/background-list/youtube-link-input";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
const BackgroundList = () => {
  return (
    <div className="w-[267px] min-w-[267px] bg-background rounded-md p-5 shadow-lg flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Suspense
          fallback={
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="w-12 h-5 rounded-full" />
              ))}
            </div>
          }
        >
          <BackgroundTypesList />
        </Suspense>
      </div>
      <YoutubeLinkInput />
    </div>
  );
};

export default React.memo(BackgroundList);
