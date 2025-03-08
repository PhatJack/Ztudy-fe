import { Metadata } from "next";
import StudyGroupPage from "./_components/StudyGroupPage";

export const metadata: Metadata = {
  title: "Study Group",
};

export default function StudyGroup() {
  return <StudyGroupPage />;
}
