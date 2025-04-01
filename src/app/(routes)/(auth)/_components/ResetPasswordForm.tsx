"use client";
import LoadingSpinner from "@/components/loading/loading-spinner";
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
import {
  forgotPasswordStep2BodySchema,
  ForgotPasswordStep2BodySchema,
  usePostForgotPasswordStep2Mutation,
} from "@/service/(auth)/forgot-password.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  params: { uid: string; token: string };
}

const ResetPasswordForm = ({ params }: Props) => {
  const { uid, token } = params;

  const router = useRouter();
  const resetPasswordMutation = usePostForgotPasswordStep2Mutation();

  const resetPasswordForm = useForm<ForgotPasswordStep2BodySchema>({
    defaultValues: {
      new_password1: "",
      new_password2: "",
      uid,
      token,
    },
    resolver: zodResolver(forgotPasswordStep2BodySchema),
  });

  const onSubmitResetPassword = (data: ForgotPasswordStep2BodySchema) => {
    console.log(data);

    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password reset successful..");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      },
      onError: (error) => {
        toast.error(error.detail || "Something went wrong");
      },
    });
  };

  return (
    <Form {...resetPasswordForm}>
      <form
        onSubmit={resetPasswordForm.handleSubmit(onSubmitResetPassword)}
        className="space-y-4"
      >
        <p className="text-xl font-bold text-center">Reset Password</p>
        {resetPasswordMutation.isSuccess ? (
          <div className="text-center">
            <p>Password reset successful. Redirecting you to login page...</p>
          </div>
        ) : (
          <>
            <FormField
              control={resetPasswordForm.control}
              name="new_password1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="New password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetPasswordForm.control}
              name="new_password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Confirm new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetPasswordForm.control}
              name="uid"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetPasswordForm.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                "Reset Password"
              )}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
