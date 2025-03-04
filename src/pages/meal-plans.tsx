
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Plus, Search, ShoppingCart, Copy, Brain, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import CreateMealDialog from "@/components/meal-plans/CreateMealDialog";
import { useNavigate } from "react-router-dom";

// Mock data for meal plans
const mealPlansData = [
  {
    id: 1,
    title: "Balanced Diet Plan",
    description: "General purpose nutrition plan",
    details: "A well-balanced meal plan with proper macro distribution suitable for most clients.",
    clientCount: 12
  },
  {
    id: 2,
    title: "Weight Loss Plan",
    description: "Calorie deficit focused plan",
    details: "A structured meal plan designed for healthy and sustainable weight loss.",
    clientCount: 8
  },
  {
    id: 3,
    title: "Muscle Gain Plan",
    description: "High protein nutrition",
    details: "Protein-rich meal plan designed for clients focused on muscle development.",
    clientCount: 5
  }
];

const MealPlansPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleCreateMealPlan = () => {
    setCreateDialogOpen(true);
  };

  const handleViewDetails = (id: number) => {
    navigate(`/meal-plans/${id}`);
    toast({
      title: "Opening meal plan details",
      description: "Viewing detailed information for the selected plan",
    });
  };

  const handleGenerateShoppingList = (id: number) => {
    navigate(`/meal-plans/${id}/shopping-list`);
    toast({
      description: "Generating shopping list...",
    });
  };

  const handleAssignToClient = (id: number) => {
    navigate(`/meal-plans/${id}/assign`);
    toast({
      description: "Opening client assignment page...",
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
                <h1 className="text-2xl font-semibold md:text-3xl">Meal Plans</h1>
                <p className="text-sm text-muted-foreground">Create and manage nutrition plans for your clients</p>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={handleCreateMealPlan}>
                  <Plus size={16} className="mr-2" />
                  New Meal Plan
                </Button>
              </div>
            </div>
          </header>

          <div className="mb-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Plans</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search meal plans..." 
                    className="pl-8" 
                  />
                </div>
              </div>
            </Tabs>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mealPlansData.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{plan.details}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{plan.clientCount} clients using this plan</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(plan.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGenerateShoppingList(plan.id)}
                    >
                      <ShoppingCart size={14} className="mr-1" />
                      Shopping List
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAssignToClient(plan.id)}
                    >
                      <User size={14} className="mr-1" />
                      Assign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedTransition>
      </main>

      <CreateMealDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
    </div>
  );
};

export default MealPlansPage;
