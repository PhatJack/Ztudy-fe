import NotFound from "@/components/not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return <NotFound />;
}