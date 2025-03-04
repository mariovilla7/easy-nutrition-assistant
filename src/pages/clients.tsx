
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

const ClientsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddClient = () => {
    toast({
      description: "Opening client creation form...",
    });
    // In a real app, this would navigate to a client creation form
  };

  const handleViewProfile = (id: number) => {
    toast({
      description: "Opening client profile...",
    });
    // In a real app, this would navigate to a client profile page
  };

  const handleAssignMealPlan = (id: number) => {
    navigate(`/meal-plans/new/assign`);
    toast({
      description: "Choose a meal plan to assign...",
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Clients</h1>
                <p className="text-sm text-muted-foreground">Manage your client roster and profiles</p>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={handleAddClient}>
                  <Plus size={16} className="mr-2" />
                  Add Client
                </Button>
              </div>
            </div>
          </header>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search clients..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://i.pravatar.cc/100?img=${idx}`} />
                      <AvatarFallback>
                        {idx % 2 === 0 ? "JD" : idx % 3 === 0 ? "AS" : "MK"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {idx % 2 === 0 
                          ? "Jane Doe" 
                          : idx % 3 === 0 
                            ? "Alex Smith" 
                            : "Maria Kim"}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Client since {idx % 2 === 0 ? "Jan 2023" : idx % 3 === 0 ? "Mar 2023" : "Nov 2022"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 grid grid-cols-2 gap-1 text-sm">
                    <p className="text-muted-foreground">Age:</p>
                    <p>{20 + idx * 3}</p>
                    <p className="text-muted-foreground">Goal:</p>
                    <p>{idx % 2 === 0 ? "Weight Loss" : idx % 3 === 0 ? "Muscle Gain" : "Balanced Diet"}</p>
                    <p className="text-muted-foreground">Plan:</p>
                    <p>{idx % 2 === 0 ? "Weight Loss Plan" : idx % 3 === 0 ? "Muscle Gain Plan" : "Balanced Diet Plan"}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAssignMealPlan(idx)}
                    >
                      <Utensils size={14} className="mr-1" />
                      Assign Meal Plan
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProfile(idx)}
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
