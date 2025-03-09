import React, { Suspense } from "react";
import ZtudyCommunity from "./ZtudyCommunity";
import LoadingSpinner from "@/components/loading/loading-spinner";

const DashboardPage = () => {
  return (
    <div className="relative flex h-[calc(100vh-3rem)]">
      <div className="flex-1 flex justify-center lg:py-10 lg:px-6 p-2 w-full">
        <div className="lg:max-w-[1000px] border w-full"></div>
      </div>
      <div className="max-w-[270px] w-[270px] h-full bg-white dark:bg-background hidden flex-col gap-2 p-4 lg:flex">
        <h5 className="font-medium p-2 bg-muted/40 border-y border-border text-sm text-muted-foreground">
          Ztudy Community
        </h5>
        <Suspense
          fallback={
            <div className="h-full w-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
          }
        >
          <ZtudyCommunity />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
