"use client";
import CommunityItem from "@/components/hover-card/CommunityItem";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { useListUsersInfinite } from "@/service/(users)/list-users.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ZtudyCommunity = () => {
  const { ref, inView } = useInView();
  const { data, isFetching, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...useListUsersInfinite(),
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="flex flex-col space-y-2 divide-y divide-input overflow-y-auto">
      {isLoading ||
        (isFetching && (
          <div className="h-full w-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ))}
      {data &&
        data.results.map((user, index) => (
          <CommunityItem user={user} key={index} />
        ))}
      {
        <div ref={ref} className="text-center w-full text-sm pt-2">
          {isFetchingNextPage ? (
            <LoadingSpinner />
          ) : (
            "That's the whole community folks!"
          )}
        </div>
      }
    </div>
  );
};

export default React.memo(ZtudyCommunity);
