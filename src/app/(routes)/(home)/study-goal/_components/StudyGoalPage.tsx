"use client";
import React from "react";
import TodoContainer from "./TodoContainer";
import { useQuery } from "@tanstack/react-query";
import { createGetCurrentUserInformationQuery } from "@/service/(current-user)/get-current-user-information.api";
import { AuroraText } from "@/components/aurora/AuroraText";
import AvatarCustom from "@/components/avatar/AvatarCustom";
import { useTheme } from "next-themes";

const StudyGoalPage = () => {
  const { theme } = useTheme();
  const userQuery = useQuery(createGetCurrentUserInformationQuery());

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
                  Hello,{" "}
                  <strong>@{userQuery.data?.username || "username"}!</strong>
                </h1>
                <p className="font-bold text-3xl leading-6 font-sans">
                  What do you want to{" "}
                  <AuroraText
                    colors={
                      !(theme === "dark")
                        ? ["#38a169", "#d6a756", "#60b070", "#00f0ff"]
                        : ["#7ccba0", "#f1c27d", "#93d8a5", "#a5f3fc"]
                    }
                  >
                    achieve
                  </AuroraText>{" "}
                  today?
                </p>
              </div>
            </div>
          </div>
          <TodoContainer user={userQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default StudyGoalPage;
