import { Metadata } from "next";
import TermsAndConditionsPage from "../_components/TermsAndConditionsPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsAndConditions() {
  return <TermsAndConditionsPage />;
}
