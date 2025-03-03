import { Metadata } from "next";
import LeaderboardPage from "./_components/LeaderboardPage";

export const metadata: Metadata = {
  title: "Leaderboard",
};

export default function Leaderboard() {
  return <LeaderboardPage />;
}
