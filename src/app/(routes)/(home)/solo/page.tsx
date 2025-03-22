import { Metadata } from "next";
import SoloPage from "./_components/soloPage";

export const metadata: Metadata = {
  title: "Solo session",
};

export default function Solo() {
  return <SoloPage />;
}
