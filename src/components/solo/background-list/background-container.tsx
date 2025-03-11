"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, useState } from "react";
import BackgroundTypesList from "./background-types-list";
import BackgroundOptionsList from "./background-options-list";

const BackgroundContainer = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-12 h-5 rounded-full" />
            ))}
          </div>
        }
      >
        <BackgroundTypesList
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Suspense>
      <BackgroundOptionsList activeTab={activeTab} />
    </>
  );
};

export default BackgroundContainer;
