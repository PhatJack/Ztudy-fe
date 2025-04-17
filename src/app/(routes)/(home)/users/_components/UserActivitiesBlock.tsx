import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserActivitiesBlockProps {
  userId: string;
}

const UserActivitiesBlock = ({ userId }: UserActivitiesBlockProps) => {
  // Mock data - replace with actual API calls
  const weeklyData = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 3.8 },
    { name: 'Wed', hours: 1.2 },
    { name: 'Thu', hours: 4.0 },
    { name: 'Fri', hours: 2.7 },
    { name: 'Sat', hours: 5.2 },
    { name: 'Sun', hours: 3.1 },
  ];

  const monthlyData = [
    { name: 'Week 1', hours: 15.2 },
    { name: 'Week 2', hours: 12.8 },
    { name: 'Week 3', hours: 18.4 },
    { name: 'Week 4', hours: 10.5 },
  ];

  const recentActivities = [
    { id: 1, type: 'Course Completion', name: 'Advanced JavaScript', date: '2023-06-15' },
    { id: 2, type: 'Assignment Submission', name: 'React Hooks Essay', date: '2023-06-12' },
    { id: 3, type: 'Quiz Attempt', name: 'TypeScript Fundamentals', date: '2023-06-10' },
    { id: 4, type: 'Forum Post', name: 'Discussing State Management', date: '2023-06-08' },
  ];

  return (
    <Card className="w-full bg-white dark:bg-background shadow-none">
      <CardHeader>
        <CardTitle>User Activities</CardTitle>
        <CardDescription>Overview of user&apos;s learning activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Activity Chart</TabsTrigger>
            <TabsTrigger value="recent">Recent Activities</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="space-y-4">
            <div className="pt-4">
              <Tabs defaultValue="weekly">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={weeklyData}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="monthly" className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="space-y-4 pt-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.name}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserActivitiesBlock;
