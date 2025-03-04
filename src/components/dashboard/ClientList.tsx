
import { cn } from "@/lib/utils";
import { ChevronRight, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedTransition from "../layout/AnimatedTransition";

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
    <div
      className={cn(
        "rounded-xl border bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary" />
          <h3 className="font-medium">Recent Clients</h3>
        </div>
        <Link to="/clients">
          <Button variant="ghost" size="sm" className="text-xs">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <AnimatedTransition>
          {clients.map((client, index) => (
            <Link key={client.id} to={`/clients/${client.id}`}>
              <div
                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
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
    </div>
  );
};

export default ClientList;
