
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import CreateClientDialog from "@/components/clients/CreateClientDialog";

const ClientsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  // This would be fetched from an API in a real application
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      joinDate: "Jan 2023",
      age: 26,
      goal: "Weight Loss",
      plan: "Weight Loss Plan"
    },
    {
      id: 2,
      name: "Alex Smith",
      email: "alex.smith@example.com",
      joinDate: "Mar 2023",
      age: 32,
      goal: "Muscle Gain",
      plan: "Muscle Gain Plan"
    },
    {
      id: 3,
      name: "Maria Kim",
      email: "maria.kim@example.com",
      joinDate: "Nov 2022",
      age: 29,
      goal: "Balanced Diet",
      plan: "Balanced Diet Plan"
    },
    {
      id: 4,
      name: "John Johnson",
      email: "john.j@example.com",
      joinDate: "Feb 2023",
      age: 45,
      goal: "Weight Loss",
      plan: "Weight Loss Plan"
    },
    {
      id: 5,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      joinDate: "Apr 2023",
      age: 38,
      goal: "Muscle Gain",
      plan: "Muscle Gain Plan"
    },
    {
      id: 6,
      name: "David Lee",
      email: "david.lee@example.com",
      joinDate: "Dec 2022",
      age: 41,
      goal: "Balanced Diet",
      plan: "Balanced Diet Plan"
    }
  ]);

  const handleAddClient = (newClient: any) => {
    setClients([newClient, ...clients]);
  };

  const handleViewProfile = (id: number) => {
    toast({
      description: "Opening client profile...",
    });
    navigate(`/clients/${id}`);
  };

  const handleAssignMealPlan = (id: number) => {
    navigate(`/meal-plans/new/assign?clientId=${id}`);
    toast({
      description: "Choose a meal plan to assign...",
    });
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.goal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Clients</h1>
                <p className="text-sm text-muted-foreground">Manage your client roster and profiles</p>
              </div>
              <div className="flex items-center gap-3">
                <CreateClientDialog onClientCreated={handleAddClient} />
              </div>
            </div>
          </header>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search clients..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => toast({ description: "Filter functionality coming soon" })}>
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <Card key={client.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://i.pravatar.cc/100?img=${client.id}`} />
                      <AvatarFallback>
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {client.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Client since {client.joinDate}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 grid grid-cols-2 gap-1 text-sm">
                    <p className="text-muted-foreground">Age:</p>
                    <p>{client.age}</p>
                    <p className="text-muted-foreground">Goal:</p>
                    <p>{client.goal}</p>
                    <p className="text-muted-foreground">Plan:</p>
                    <p>{client.plan}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAssignMealPlan(client.id)}
                    >
                      <Utensils size={14} className="mr-1" />
                      Assign Plan
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProfile(client.id)}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default ClientsPage;
