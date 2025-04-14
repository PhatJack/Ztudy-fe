"use client";
import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginBodySchema, useLoginMutation } from "@/service/(auth)/login.api";
import toast from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { checkPreferencesApi } from "@/service/(users)/check-preferences.api";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useOnlineWebSocket } from "@/contexts/OnlineWebSocketContext";
import { setCookie } from "cookies-next";

export function LoginForm() {
  const { connectOnlineSocket } = useOnlineWebSocket();
  const [state, dispatch] = useAuthContext();
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const loginForm = useForm<LoginBodySchema>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const onSubmit = (data: LoginBodySchema) => {
    console.log(data);
    loginMutation.mutate(data, {
      onSuccess: async (data) => {
        try {
          const res = await checkPreferencesApi(data.user.id);
          if (res.status == 200) {
            dispatch({ type: "CHECK_PREFERENCES", payload: false });
          }
        } catch (error) {
          dispatch({ type: "CHECK_PREFERENCES", payload: true });
        }
        setCookie("isLoggedIn", "1", {
          maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
          secure: true,
          sameSite: "lax",
        });
        dispatch({ type: "SET_USER", payload: data.user });
        connectOnlineSocket();
        router.push("/dashboard");
        toast.success("Login successful");
      },
      onError(error: any) {
        console.log("error", error);
        toast.error(
          error?.non_field_errors?.[0] || "Invalid email or password"
        );
      },
    });
  };

  const handleShowPassword = () => {
    setIsShowingPassword(!isShowingPassword);
  };

  const handleGoogleLogin = () => {
    // Tạo Google OAuth URL
    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
      `&response_type=code` +
      `&scope=email profile` +
      `&redirect_uri=${process.env.NEXT_PUBLIC_DJANGO_SERVER_URL}/auth/google/callback/` +
      `&prompt=consent` +
      `&access_type=offline`;

    // Redirect tới Google OAuth
    window.location.href = googleAuthUrl;
  };
  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className={cn("space-y-4")}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account </h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    disabled={loginMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={isShowingPassword ? "text" : "password"}
                      {...field}
                      disabled={loginMutation.isPending}
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center px-2"
                      onClick={handleShowPassword}
                    >
                      {isShowingPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <LoadingSpinner className="text-white" />
            ) : (
              "Login"
            )}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full bg-[#4285F4] text-white hover:bg-[#4285F4]/90 hover:text-white"
              onClick={handleGoogleLogin}
              type="button"
            >
              <svg
                className="stroke-white fill-white"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Google</title>
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Login with Google
            </Button>
          </div>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Register
          </Link>
        </div>
        <div className="text-center text-sm">
          Forgot your password?{" "}
          <Link
            href="/forgot-password"
            className="underline underline-offset-4 text-secondary-foreground"
          >
            Click here
          </Link>
        </div>
      </form>
    </Form>
  );
}
