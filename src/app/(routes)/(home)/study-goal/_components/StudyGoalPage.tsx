"use client";
import { createGetCurrentUserInformationQueryOptions } from "@/service/(current-user)/get-current-user-information.api";
import { useListGoals } from "@/service/(goal)/list-goals.api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const StudyGoalPage = () => {
  // const todosListQuery = useQuery(useListGoals());
  // const userQuery = useQuery(createGetCurrentUserInformationQueryOptions());
  // const user = userQuery.data;
  // const todosListQuery = useQuery({
  //   ...useListGoals({ user: user?.id }),
  //   enabled: !!user,
  // });

  return <div></div>;
};

export default StudyGoalPage;
