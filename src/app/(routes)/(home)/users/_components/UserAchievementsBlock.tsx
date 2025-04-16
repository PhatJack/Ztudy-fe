import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserAchievementsBlockProps {
  userId: string;
}

const UserAchievementsBlock = ({ userId }: UserAchievementsBlockProps) => {
  // Mock data - replace with actual API call
  const achievements = [
    { id: 1, name: 'Fast Learner', description: 'Completed 5 courses in a month', date: '2023-05-10', icon: '🚀' },
    { id: 2, name: 'Quiz Master', description: 'Scored 100% on 3 consecutive quizzes', date: '2023-04-22', icon: '🏆' },
    { id: 3, name: 'Dedicated Student', description: 'Logged in for 30 consecutive days', date: '2023-03-15', icon: '📚' },
    { id: 4, name: 'Helpful Peer', description: 'Answered 50 forum questions', date: '2023-02-28', icon: '🤝' },
  ];

  return (
    <Card className="bg-white dark:bg-background shadow-none">
      <CardHeader className="pb-2">
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {achievements.map(achievement => (
            <div key={achievement.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
              <div className="text-2xl">{achievement.icon}</div>
              <div>
                <div className="font-medium">{achievement.name}</div>
                <div className="text-sm text-muted-foreground">{achievement.description}</div>
                <div className="mt-1">
                  <Badge variant="outline" className="text-xs">
                    {new Date(achievement.date).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserAchievementsBlock;
