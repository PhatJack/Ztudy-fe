import { ContactRound, MessageSquareDot, UsersRound } from "lucide-react";

export const tabs: {
  name: string;
  value: string;
  icon: React.ElementType;
}[] = [
  {
    name: "Request",
    value: "requestToJoin",
    icon: ContactRound,
  },
  {
    name: "Room Chat",
    value: "roomChat",
    icon: MessageSquareDot,
  },
  {
    name: "People",
    value: "people",
    icon: UsersRound,
  },
];