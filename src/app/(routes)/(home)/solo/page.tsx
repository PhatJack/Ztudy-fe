import { Metadata } from "next";
import SoloPage from "./_components/soloPage";
import SoloProviders from "./providers";

export const metadata: Metadata = {
  title: "Solo session",
};

export default function Solo() {
  return (
    <SoloProviders>
      <SoloPage />
    </SoloProviders>
  );
}
