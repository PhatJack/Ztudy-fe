import { Metadata } from "next";
import PrivacyPolicyPage from "../_components/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
