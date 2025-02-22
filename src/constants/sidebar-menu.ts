import { Globe, Home, Target, UserCircle2, UserRound } from "lucide-react";

export const menu: {
  icon: React.ElementType;
  label: string;
  href: string;
}[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: UserCircle2,
    label: "Solo Study",
    href: "/solo",
  },
  {
    icon: Target,
    label: "Study Goal",
    href: "/study-goal",
  },
  {
    icon: UserRound,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: Globe,
    label: "Leaderboard",
    href: "/leaderboard",
  },
];
