"use client";
import TooltipTemplate from "@/components/tooltip/TooltipTemplate";
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
  changePasswordSchema,
  ChangePasswordSchema,
} from "@/lib/schemas/user/change-password.schema";
import { useEditChangePasswordMutation } from "@/service/(current-user)/edit-change-password.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const changePasswordMutation = useEditChangePasswordMutation();

  const changePasswordForm = useForm<ChangePasswordSchema>({
    defaultValues: {
      new_password1: "",
      new_password2: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordSchema) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        changePasswordForm.reset();
        toast.success("Password changed successfully.");
      },
      onError: (error) => {
				console.log(error)
        toast.error(error.response?.data.detail || "An error occurred.");
      },
    });
  };

  return (
    <div className="w-full rounded-xl bg-input flex flex-col items-center space-y-2 p-6">
      <div className="w-full flex justify-between items-center">
        <span className="text-sm font-bold">Change Password</span>
        <TooltipTemplate
          variant={"information"}
          content="Keep your account secure! Set a strong password with at least 8 characters, including a mix of letters, numbers, and symbols."
        >
          <span className="cursor-pointer">
            <AlertCircleIcon size={16} />
          </span>
        </TooltipTemplate>
      </div>
      <Form {...changePasswordForm}>
        <form
          onSubmit={changePasswordForm.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={changePasswordForm.control}
            name="new_password1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={"Enter your new password"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={changePasswordForm.control}
            name="new_password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={"Cofirm your new password"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={changePasswordMutation.isPending}>
            {changePasswordMutation.isPending
              ? "Updating..."
              : "Change Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
