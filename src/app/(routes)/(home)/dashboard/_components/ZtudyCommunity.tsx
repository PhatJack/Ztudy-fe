"use client";
import AvatarCustom from "@/components/avatar/AvatarCustom";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { useListUsers } from "@/service/(users)/list-users.api";
import { checkLastLogin } from "@/util/checkLastLogin";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const ZtudyCommunity = () => {
  const usersQuery = useSuspenseQuery({...useListUsers(),staleTime: 3 * 60 * 1000});
  const users = usersQuery.data?.results;

  return (
    <div className="flex flex-col space-y-2 divide-y divide-background dark:divide-input">
      {/* {usersQuery.isLoading && usersQuery.isFetching ? (
        <div className="w-full h-[500px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : null} */}
      {usersQuery.isSuccess &&
        users &&
        users.map((user, index) => (
          <div key={index} className="flex space-x-2 items-center pt-2 px-2">
            <div className="relative">
              <AvatarCustom
                className="rounded-lg w-9 h-9"
                src="/daddy-chill.gif"
              />
              {checkLastLogin(user.last_login) && (
                <span className="size-2 rounded-full bg-emerald-400 absolute -right-0.5 -bottom-0.5"></span>
              )}
            </div>
            <span className="text-sm">{user.username}</span>
          </div>
        ))}
    </div>
  );
};

export default React.memo(ZtudyCommunity);
