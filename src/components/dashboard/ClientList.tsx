
import { cn } from "@/lib/utils";
import { ChevronRight, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedTransition from "../layout/AnimatedTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demonstration
const clients = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=1",
    status: "active",
    plan: "Weight Loss",
    lastActive: "Today",
    progress: 75,
  },
  {
    id: "2",
    name: "Michael Chen",
    image: "https://i.pravatar.cc/150?img=2",
    status: "pending",
    plan: "Muscle Gain",
    lastActive: "Yesterday",
    progress: 45,
  },
  {
    id: "3",
    name: "Jessica Park",
    image: "https://i.pravatar.cc/150?img=3",
    status: "active",
    plan: "Maintenance",
    lastActive: "2 days ago",
    progress: 90,
  },
  {
    id: "4",
    name: "David Rodriguez",
    image: "https://i.pravatar.cc/150?img=4",
    status: "inactive",
    plan: "Sports Nutrition",
    lastActive: "1 week ago",
    progress: 30,
  },
];

interface ClientListProps {
  className?: string;
}

const ClientList = ({ className }: ClientListProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Recent Clients</CardTitle>
          <CardDescription>Your active client roster</CardDescription>
        </div>
        <Link to="/clients">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AnimatedTransition>
            {clients.map((client, index) => (
              <Link key={client.id} to={`/clients/${client.id}`}>
                <div
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50 dark:hover:bg-muted/10"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={client.image} alt={client.name} />
                      <AvatarFallback>
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            client.status === "active"
                              ? "default"
                              : client.status === "pending"
                              ? "outline"
                              : "secondary"
                          }
                          className="px-1.5 py-0 text-[10px]"
                        >
                          {client.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{client.plan}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex justify-end">
                        <span className="text-xs font-medium">{client.progress}%</span>
                      </div>
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${client.progress}%` }}
                        />
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </AnimatedTransition>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientList;
