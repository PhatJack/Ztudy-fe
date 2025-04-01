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
import {
  loginBodySchema,
  LoginBodySchema,
  useLoginMutation,
} from "@/service/(auth)/login.api";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { checkPreferencesApi } from "@/service/(users)/check-preferences.api";
import { useAuthContext } from "@/hooks/useAuthContext";

export function LoginForm() {
  const [, dispatch] = useAuthContext();
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const loginForm = useForm<LoginBodySchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginBodySchema),
  });
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const onSubmit = (data: LoginBodySchema) => {
    loginMutation.mutate(data, {
      onSuccess: async (data) => {
        try {
          const res = await checkPreferencesApi(data.user.id);
          if (res.status == 400) {
            dispatch({ type: "CHECK_PREFERENCES", payload: false });
          } else {
            dispatch({ type: "CHECK_PREFERENCES", payload: true });
          }
        } catch (error) {
          console.error("Error checking preferences:", error);
        }
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
                      placeholder="Enter your email"
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
            {loginMutation.isPending ? <LoadingSpinner /> : "Login"}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full bg-[#181717] text-white hover:bg-[#181717]/90 hover:text-white"
            >
              <svg
                className="stroke-white fill-white"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Login with GitHub
            </Button>
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
