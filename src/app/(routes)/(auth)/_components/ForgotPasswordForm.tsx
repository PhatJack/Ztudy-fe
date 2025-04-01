"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import {
  forgotPasswordStep1BodySchema,
  ForgotPasswordStep1BodySchema,
  usePostForgotPasswordStep1Mutation,
} from "@/service/(auth)/forgot-password.api";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/loading/loading-spinner";
import Link from "next/link";
const ForgotPasswordForm = () => {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");

  const forgotPwdStepOneMutation = usePostForgotPasswordStep1Mutation();

  const forgotPwdStepOneForm = useForm<ForgotPasswordStep1BodySchema>({
    resolver: zodResolver(forgotPasswordStep1BodySchema),
    defaultValues: { email: "" },
  });

  const onSubmitStepOne = (data: ForgotPasswordStep1BodySchema) => {
    forgotPwdStepOneMutation.mutate(data, {
      onSuccess(dataSuccess) {
        console.log(dataSuccess);
        toast.success(
          dataSuccess.detail ||
            "We have sent a link to your email. Please check your email"
        );
        setUserEmail(data.email);
        setStep(2);
      },
      onError(error) {
        if (error?.email?.[0]) {
          toast.error(error.email[0]);
        }
      },
    });
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div className="text-xl font-bold">Forgot Password?</div>
      <div className="text-muted-foreground text-center">
        {step === 1 &&
          "No worries, we'll send you a link to reset your password."}
        {step === 2 && (
          <>
            We have sent a link to{" "}
            <span className="font-bold">{userEmail || "your email"}</span>.
            Please click on that.
          </>
        )}
      </div>
      {step === 1 && (
        <Form {...forgotPwdStepOneForm}>
          <form
            onSubmit={forgotPwdStepOneForm.handleSubmit(onSubmitStepOne)}
            className="space-y-4 w-full"
          >
            <FormField
              control={forgotPwdStepOneForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={forgotPwdStepOneMutation.isPending}
            >
              {forgotPwdStepOneMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>
      )}
      <div className="w-full flex justify-center">
        <Button
          className="hover:bg-transparent hover:underline hover:text-accent gap-1"
          variant={"ghost"}
          type="button"
          asChild
        >
          <Link href={"/login"}>
            <ArrowLeft size={16} /> Back to login
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
