"use client";
import React, { Suspense, useState } from "react";
import ZtudyCommunity from "./ZtudyCommunity";
import LoadingSpinner from "@/components/loading/loading-spinner";
import AvatarCustom from "@/components/avatar/AvatarCustom";
import { useQuery } from "@tanstack/react-query";
import { createGetCurrentUserInformationQueryOptions } from "@/service/(current-user)/get-current-user-information.api";
import TodoContainer from "./TodoContainer";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useOnlineWebSocket } from "@/contexts/OnlineWebSocketContext";

const DashboardPage = () => {
  const { onlineCount } = useOnlineWebSocket();
  const [openCommunity, setOpenCommunity] = useState(false);

  const handleOpenCommunity = () => {
    setOpenCommunity((prev) => !prev);
  };
  const userQuery = useQuery(createGetCurrentUserInformationQueryOptions());

  return (
    <div className="relative flex h-full xl:h-[calc(100vh-3rem-0.5rem)] overflow-hidden">
      <div className="flex-1 flex justify-center lg:py-10 lg:px-6 px-4 py-10 w-full">
        <div className="xl:max-w-[1000px] w-full flex flex-col space-y-6">
          <div className="w-full flex xl:flex-row flex-col justify-between items-center xl:gap-0 gap-6">
            <div className="flex xl:flex-row flex-col items-center gap-2">
              <AvatarCustom
                src={userQuery.data?.avatar}
                className="w-12 h-12"
              />
              <div className="xl:text-left text-center">
                <h1 className="font-medium text-muted-foreground">
                  Hello, {userQuery.data?.username || "username"}!
                </h1>
                <p className="font-bold text-3xl xl:text-2xl leading-6 font-sans">
                  Welcome back to Ztudy!
                </p>
              </div>
            </div>
            <div className="w-full xl:w-fit flex justify-between items-center">
              <div className="flex items-center space-x-1 w-fit px-2 py-1 rounded-full bg-background text-sm">
                <span className="size-2 bg-emerald-400 animate-pulse-custom rounded-full"></span>
                <span>
                  <strong>{onlineCount}</strong>
                  <span> online</span>
                </span>
              </div>
              <div className="xl:hidden block">
                <Button
                  size={"icon"}
                  variant={openCommunity ? "default" : "outline"}
                  className="border-primary"
                  onClick={handleOpenCommunity}
                >
                  <Users />
                </Button>
              </div>
            </div>
          </div>
          <TodoContainer user={userQuery.data} />
          <div>
            {openCommunity && (
              <div className="w-full h-full rounded-xl bg-white dark:bg-background flex-col gap-2 p-4 xl:hidden flex">
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
            )}
          </div>
        </div>
      </div>
      <div className="max-w-[270px] w-[270px] h-screen bg-white dark:bg-background hidden flex-col gap-2 p-4 xl:flex">
        <h5 className="font-medium p-2 bg-muted/40 border-y border-border text-sm text-muted-foreground">
          Ztudy Community
        </h5>
        <ZtudyCommunity />
      </div>
    </div>
  );
};

export default DashboardPage;
