"use client";
import AvatarCustom from "@/components/avatar/AvatarCustom";
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
    <div className="flex flex-col space-y-2 divide-y divide-background dark:divide-input overflow-y-auto">
      {isLoading || isFetching && (
          <div className="h-full w-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
        )}
      {data &&
        data.results.map((user, index) => (
          <div key={index} className="flex space-x-2 items-center pt-2 px-2">
            <div className="relative">
              <AvatarCustom
                className="rounded-full w-9 h-9"
                src={user.avatar || "/default.png"}
              />
              {user.is_online && (
                <span className="size-3 rounded-full bg-emerald-400 absolute right-0 bottom-0 border-2 border-white"></span>
              )}
            </div>
            <span className="text-sm">{user.username}</span>
          </div>
        ))}
      {
        <div ref={ref} className="text-center w-full text-sm !mt-3">
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
