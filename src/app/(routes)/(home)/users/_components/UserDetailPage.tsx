"use client";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { useGetUserById } from "@/service/(users)/get-user.api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import dynamic from "next/dynamic";

const UserInfoBlock = dynamic(() => import("./UserInfoBlock"));
const UserStatsBlock = dynamic(() => import("./UserStatsBlock"));
const UserActivitiesBlock = dynamic(() => import("./UserActivitiesBlock"));
const UserAchievementsBlock = dynamic(() => import("./UserAchievementsBlock"));

interface Props {
  id: string;
}

const UserDetailPage = ({ id }: Props) => {
  const userQuery = useQuery(useGetUserById(id));

  if (userQuery.isLoading) {
    return <LoadingSpinner />;
  }

  const userData = userQuery.data;

  return (
    <div className="p-6">
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-3 flex flex-col space-y-6">
          {userData && <UserInfoBlock user={userData} />}
          <UserAchievementsBlock userId={id} />
        </div>
        <div className="xl:col-span-6">
          <div className="w-full rounded-xl bg-background p-6">
            <UserActivitiesBlock userId={id} />
          </div>
        </div>
        <div className="xl:col-span-3 flex flex-col space-y-6"></div>
      </div>
    </div>
  );
};

export default UserDetailPage;
