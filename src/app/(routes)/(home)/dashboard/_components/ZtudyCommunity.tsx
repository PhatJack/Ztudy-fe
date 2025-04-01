"use client";
import AvatarCustom from "@/components/avatar/AvatarCustom";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { useListUsers } from "@/service/(users)/list-users.api";
import { checkLastLogin } from "@/util/checkLastLogin";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ZtudyCommunity = () => {
  const usersQuery = useQuery({ ...useListUsers(), staleTime: 3 * 60 * 1000 });
  const users = usersQuery.data?.results.filter((user) => user.id !== 1);

  return (
    <div className="flex flex-col space-y-2 divide-y divide-background dark:divide-input overflow-y-auto">
      {usersQuery.isLoading && (
        <div className="h-full w-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      {usersQuery.isSuccess &&
        users &&
        users.map((user, index) => (
          <div key={index} className="flex space-x-2 items-center pt-2 px-2">
            <div className="relative">
              <AvatarCustom
                className="rounded-full w-9 h-9"
                src={user.avatar || "/default.png"}
              />
              {checkLastLogin(user.last_login) && (
                <span className="size-3 rounded-full bg-emerald-400 absolute right-0 bottom-0 border-2 border-white"></span>
              )}
            </div>
            <span className="text-sm">{user.username}</span>
          </div>
        ))}
    </div>
  );
};

export default React.memo(ZtudyCommunity);
