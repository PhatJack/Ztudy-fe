import { Metadata } from "next";
import React from "react";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
};

const ForgotPassword = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPassword;
