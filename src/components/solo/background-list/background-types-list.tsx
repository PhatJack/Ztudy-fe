import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useListBackgroundVideoTypes } from "@/service/(solo)/background/list-background-types.api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface Props {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const BackgroundTypesList = ({ activeTab, setActiveTab }: Props) => {
  const backgroundVideoTypesQuery = useQuery(useListBackgroundVideoTypes());

  const backgroundVideoTypes = backgroundVideoTypesQuery.data?.results;

  useEffect(() => {
    if (backgroundVideoTypesQuery.isSuccess) {
      setActiveTab(backgroundVideoTypesQuery.data?.results[0].id);
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-1">
      {backgroundVideoTypesQuery.isLoading && (
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="w-12 h-5 rounded-full" />
          ))}
        </div>
      )}
      {backgroundVideoTypesQuery.isSuccess &&
        backgroundVideoTypes?.map((backgroundType) => (
          <Button
            type="button"
            size={"sm"}
            variant={activeTab === backgroundType.id ? "black" : "white"}
            className="h-5 px-1.5 rounded-full"
            key={backgroundType.id}
            onClick={() => setActiveTab(backgroundType.id)}
          >
            {backgroundType.name}
          </Button>
        ))}
    </div>
  );
};

export default React.memo(BackgroundTypesList);
