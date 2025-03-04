
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    type: "meal_plan_created",
    title: "Meal Plan Created",
    description: "You created a new meal plan: 'Weight Loss - High Protein'",
    time: "12 minutes ago",
    badge: "New"
  },
  {
    id: 2,
    type: "client_joined",
    title: "New Client",
    description: "Sarah Williams joined as a new client",
    time: "2 hours ago"
  },
  {
    id: 3,
    type: "message_received",
    title: "Message Received",
    description: "Alex Smith: 'Thanks for the new meal plan!'",
    time: "3 hours ago"
  },
  {
    id: 4,
    type: "appointment_scheduled",
    title: "Appointment Scheduled",
    description: "Consultation with Maria Kim scheduled for tomorrow at 2:00 PM",
    time: "Yesterday"
  },
  {
    id: 5,
    type: "meal_plan_assigned",
    title: "Meal Plan Assigned",
    description: "You assigned 'Balanced Diet Plan' to John Johnson",
    time: "2 days ago"
  },
  {
    id: 6,
    type: "feedback_received",
    title: "Feedback Received",
    description: "Jane Doe rated their meal plan 5 stars",
    time: "2 days ago"
  },
  {
    id: 7,
    type: "client_achievement",
    title: "Client Achievement",
    description: "David Lee reached their weight goal of 180 lbs",
    time: "3 days ago",
    badge: "Achievement"
  }
];

const ActivityFeed = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <CardDescription>Your latest actions and notifications</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Plus size={16} className="mr-2" />
          Add Note
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium leading-none">{activity.title}</p>
                    {activity.badge && (
                      <Badge variant={activity.badge === "New" ? "default" : "secondary"} className="text-xs">
                        {activity.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
