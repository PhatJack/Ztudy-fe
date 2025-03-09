import { Metadata } from "next";
import StudyGoalPage from "./_components/StudyGoalPage";

export const metadata: Metadata = {
  title: "Study Goal",
};

export default function StudyGoal() {
  return <StudyGoalPage />;
}
