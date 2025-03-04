
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Plus, Edit, User, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ShoppingList from "@/components/meal-plans/ShoppingList";

const MealPlanDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock meal plan data - in a real app, this would come from an API or database
  const mealPlan = {
    id: id || "1",
    title: id === "new" ? "New Meal Plan" : id === "ai-generated" ? "AI Generated Plan" : "Balanced Diet Plan",
    description: "A well-balanced meal plan with proper macro distribution",
    meals: [
      {
        day: "Monday",
        items: [
          { type: "Breakfast", name: "Oatmeal with berries and nuts", calories: 350 },
          { type: "Lunch", name: "Grilled chicken salad", calories: 450 },
          { type: "Dinner", name: "Baked salmon with vegetables", calories: 550 },
          { type: "Snack", name: "Greek yogurt with honey", calories: 200 }
        ]
      },
      {
        day: "Tuesday",
        items: [
          { type: "Breakfast", name: "Vegetable omelette", calories: 320 },
          { type: "Lunch", name: "Quinoa bowl with avocado", calories: 480 },
          { type: "Dinner", name: "Turkey meatballs with brown rice", calories: 520 },
          { type: "Snack", name: "Apple with almond butter", calories: 180 }
        ]
      }
    ]
  };

  const handleBack = () => {
    navigate("/meal-plans");
  };

  const handleEdit = () => {
    toast({
      description: "Editing meal plan...",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Meal plan deleted",
      description: "The meal plan has been removed",
    });
    navigate("/meal-plans");
  };

  const handleAssignToClient = () => {
    navigate(`/meal-plans/${id}/assign`);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBack} className="mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Meal Plans
            </Button>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">{mealPlan.title}</h1>
                <p className="text-sm text-muted-foreground">{mealPlan.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit size={16} className="mr-2" />
                  Edit Plan
                </Button>
                <Button variant="outline" size="sm" onClick={handleAssignToClient}>
                  <User size={16} className="mr-2" />
                  Assign to Client
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="meals">Meals</TabsTrigger>
              <TabsTrigger value="shopping-list">Shopping List</TabsTrigger>
              <TabsTrigger value="clients">Assigned Clients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Plan Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">Total Days:</span>
                      <span>7 days</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">Average Calories:</span>
                      <span>1,850 kcal / day</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">Macros Distribution:</span>
                      <span>Protein: 30%, Carbs: 45%, Fat: 25%</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">Created:</span>
                      <span>May 10, 2023</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Assigned Clients:</span>
                      <span>5 clients</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="meals" className="space-y-4">
              <div className="mb-4 flex justify-end">
                <Button size="sm">
                  <Plus size={16} className="mr-2" />
                  Add Meal
                </Button>
              </div>
              
              {mealPlan.meals.map((day, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{day.day}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {day.items.map((meal, mIndex) => (
                        <div key={mIndex} className="flex items-center justify-between border-b pb-2 last:border-0">
                          <div>
                            <p className="font-medium">{meal.type}</p>
                            <p className="text-sm text-muted-foreground">{meal.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">{meal.calories} kcal</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="shopping-list">
              <ShoppingList mealPlanId={mealPlan.id} />
            </TabsContent>
            
            <TabsContent value="clients">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Assigned Clients</span>
                    <Button size="sm" onClick={handleAssignToClient}>
                      <Plus size={16} className="mr-2" />
                      Assign to More Clients
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-sm text-muted-foreground">Assigned on: May 12, 2023</p>
                        </div>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">John Davis</p>
                          <p className="text-sm text-muted-foreground">Assigned on: May 15, 2023</p>
                        </div>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default MealPlanDetailsPage;
