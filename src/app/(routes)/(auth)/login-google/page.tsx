import { Metadata } from "next";
import GoogleCallbackPage from "../_components/GoogleCallbackPage";

export const metadata: Metadata = {
  title: "Login With Google",
};

export default function LoginPage() {
  return <GoogleCallbackPage />;
}
