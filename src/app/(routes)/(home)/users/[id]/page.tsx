import { getUserByIdApi } from "@/service/(users)/get-user.api";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import UserDetailPage from "../_components/UserDetailPage";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { id } = await params;
  const user = await getUserByIdApi(id);

  return {
    title: `${user.username}`,
    description: `User profile of ${user.username}`,
    openGraph: {
      title: `${user.username}`,
      description: `User profile of ${user.username}`,
      url: `https://ztudy.io.vn/users/${id}`,
    },
  };
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <UserDetailPage id={id} />;
};

export default Page;
