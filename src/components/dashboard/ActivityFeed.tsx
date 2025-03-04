
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scroll, ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Clock, MessageCircle, ThumbsUp, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedTransition from "../layout/AnimatedTransition";

// Mock data for demonstration
const activities = [
  {
    id: "1",
    type: "feedback",
    user: {
      name: "Sarah Johnson",
      image: "https://i.pravatar.cc/150?img=1",
    },
    content: "Left feedback on her meal plan",
    time: "10 minutes ago",
  },
  {
    id: "2",
    type: "message",
    user: {
      name: "Michael Chen",
      image: "https://i.pravatar.cc/150?img=2",
    },
    content: "Sent you a message",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "signup",
    user: {
      name: "Jessica Park",
      image: "https://i.pravatar.cc/150?img=3",
    },
    content: "Completed sign up",
    time: "3 hours ago",
  },
  {
    id: "4",
    type: "metric",
    user: {
      name: "David Rodriguez",
      image: "https://i.pravatar.cc/150?img=4",
    },
    content: "Updated weight metric",
    time: "Yesterday",
  },
  {
    id: "5",
    type: "feedback",
    user: {
      name: "Emma Wilson",
      image: "https://i.pravatar.cc/150?img=5",
    },
    content: "Rated her meal plan 5 stars",
    time: "Yesterday",
  },
  {
    id: "6",
    type: "message",
    user: {
      name: "John Smith",
      image: "https://i.pravatar.cc/150?img=6",
    },
    content: "Replied to your message",
    time: "2 days ago",
  },
];

interface ActivityFeedProps {
  className?: string;
}

const ActivityFeed = ({ className }: ActivityFeedProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "feedback":
        return <ThumbsUp size={14} />;
      case "message":
        return <MessageCircle size={14} />;
      case "signup":
        return <UserCheck size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "feedback":
        return "bg-green-100 text-green-700";
      case "message":
        return "bg-blue-100 text-blue-700";
      case "signup":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          <h3 className="font-medium">Recent Activity</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </div>

      <ScrollArea className="h-[400px] pr-3">
        <div className="relative space-y-5 pr-2">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-muted/70" />

          <AnimatedTransition>
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="relative pl-9"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "absolute left-[calc(1rem-11px)] top-0 flex h-6 w-6 items-center justify-center rounded-full",
                    getActivityColor(activity.type)
                  )}
                >
                  {getActivityIcon(activity.type)}
                </div>

                <div className="rounded-lg border bg-white p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={activity.user.image} alt={activity.user.name} />
                        <AvatarFallback>
                          {activity.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{activity.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.content}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-xs font-normal">
                      {activity.time}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </AnimatedTransition>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ActivityFeed;
