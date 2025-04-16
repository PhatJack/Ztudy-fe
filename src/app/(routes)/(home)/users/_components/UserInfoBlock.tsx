import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrentUserResponseSchema } from "@/service/(current-user)/get-current-user-information.api";
import AvatarCustom from "@/components/avatar/AvatarCustom";

interface UserInfoBlockProps {
  user: CurrentUserResponseSchema;
}

const UserInfoBlock = ({ user }: UserInfoBlockProps) => {
  if (!user) return null;

  return (
    <Card className="bg-white dark:bg-background shadow-none">
      <CardHeader className="pb-2">
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <AvatarCustom
            className="w-24 h-24"
            src={user?.avatar || "/default.png"}
          />
          <div className="text-center">
            <h3 className="text-xl font-bold">
              {user?.username || "Unknown User"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {user?.email || "No email available"}
            </p>
          </div>
          <div className="w-full pt-4 border-t">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex flex-col">
                <span className="text-muted-foreground">Joined</span>
                <span>
                  {new Date(
                    user?.created_at || Date.now()
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Last active</span>
                <span>
                  {new Date(
                    user?.last_login || Date.now()
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoBlock;
