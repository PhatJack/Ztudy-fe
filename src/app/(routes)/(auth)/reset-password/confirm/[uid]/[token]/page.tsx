import ResetPasswordForm from "@/app/(routes)/(auth)/_components/ResetPasswordForm";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { uid: string; token: string };
};

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset Password",
};

const ResetPassword = async ({ params }: Props) => {


  return <ResetPasswordForm params={params} />;
};

export default ResetPassword;
