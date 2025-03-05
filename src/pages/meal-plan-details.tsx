
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Plus, Edit, User, Trash2, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ShoppingList from "@/components/meal-plans/ShoppingList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const MealPlanDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showMealEditDialog, setShowMealEditDialog] = useState(false);
  const [editingMeal, setEditingMeal] = useState<any>(null);

  // Mock food preferences
  const foodPreferences = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten Free" },
    { id: "dairy-free", label: "Dairy Free" },
    { id: "low-carb", label: "Low Carb" },
    { id: "keto", label: "Keto" },
    { id: "paleo", label: "Paleo" },
  ];

  // Mock meal plan data - in a real app, this would come from an API or database
  const [mealPlan, setMealPlan] = useState({
    id: id || "1",
    title: id === "new" ? "New Meal Plan" : id === "ai-generated" ? "AI Generated Plan" : "Balanced Diet Plan",
    description: "A well-balanced meal plan with proper macro distribution",
    preferences: ["vegetarian", "gluten-free"],
    meals: [
      {
        day: "Monday",
        items: [
          { id: "1", type: "Breakfast", name: "Oatmeal with berries and nuts", calories: 350 },
          { id: "2", type: "Lunch", name: "Grilled chicken salad", calories: 450 },
          { id: "3", type: "Dinner", name: "Baked salmon with vegetables", calories: 550 },
          { id: "4", type: "Snack", name: "Greek yogurt with honey", calories: 200 }
        ]
      },
      {
        day: "Tuesday",
        items: [
          { id: "5", type: "Breakfast", name: "Vegetable omelette", calories: 320 },
          { id: "6", type: "Lunch", name: "Quinoa bowl with avocado", calories: 480 },
          { id: "7", type: "Dinner", name: "Turkey meatballs with brown rice", calories: 520 },
          { id: "8", type: "Snack", name: "Apple with almond butter", calories: 180 }
        ]
      }
    ]
  });

  const handleBack = () => {
    navigate("/meal-plans");
  };

  const handleEdit = () => {
    setShowEditDialog(true);
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

  const handleEditMeal = (day: string, mealItem: any) => {
    setEditingMeal({ ...mealItem, day });
    setShowMealEditDialog(true);
  };

  const handleSaveEdit = (formData: FormData) => {
    const updatedPlan = {
      ...mealPlan,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      preferences: Array.from(formData.entries())
        .filter(([key, value]) => key.startsWith("pref-") && value === "on")
        .map(([key]) => key.replace("pref-", ""))
    };
    
    setMealPlan(updatedPlan);
    setShowEditDialog(false);
    
    toast({
      title: "Meal plan updated",
      description: "Your changes have been saved",
    });
  };

  const handleSaveMealEdit = (formData: FormData) => {
    if (!editingMeal) return;
    
    const updatedMeals = mealPlan.meals.map(dayMeals => {
      if (dayMeals.day === editingMeal.day) {
        return {
          ...dayMeals,
          items: dayMeals.items.map(meal => {
            if (meal.id === editingMeal.id) {
              return {
                ...meal,
                name: formData.get("name") as string,
                calories: parseInt(formData.get("calories") as string),
              };
            }
            return meal;
          })
        };
      }
      return dayMeals;
    });
    
    setMealPlan({
      ...mealPlan,
      meals: updatedMeals
    });
    
    setShowMealEditDialog(false);
    
    toast({
      description: "Meal updated successfully",
    });
  };

  const handleAddMeal = () => {
    toast({
      description: "Adding new meal...",
    });
    // In a real app, this would open a dialog to add a new meal
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
                <div className="flex flex-wrap gap-1 mt-2">
                  {mealPlan.preferences.map(pref => (
                    <Badge key={pref} variant="outline" className="bg-primary/10 text-primary">
                      {foodPreferences.find(p => p.id === pref)?.label || pref}
                    </Badge>
                  ))}
                </div>
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
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">Assigned Clients:</span>
                      <span>5 clients</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Dietary Preferences:</span>
                      <div className="flex flex-wrap gap-1">
                        {mealPlan.preferences.map(pref => (
                          <Badge key={pref} variant="outline" className="bg-primary/10 text-primary">
                            {foodPreferences.find(p => p.id === pref)?.label || pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="meals" className="space-y-4">
              <div className="mb-4 flex justify-end">
                <Button size="sm" onClick={handleAddMeal}>
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
                      {day.items.map((meal) => (
                        <div key={meal.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                          <div>
                            <p className="font-medium">{meal.type}</p>
                            <p className="text-sm text-muted-foreground">{meal.name}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-sm">{meal.calories} kcal</p>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => handleEditMeal(day.day, meal)}
                            >
                              <Edit size={14} />
                            </Button>
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

          {/* Edit Plan Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Meal Plan</DialogTitle>
                <DialogDescription>
                  Update the details of your meal plan
                </DialogDescription>
              </DialogHeader>
              <form action={handleSaveEdit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" defaultValue={mealPlan.title} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" defaultValue={mealPlan.description} rows={3} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Dietary Preferences</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {foodPreferences.map(pref => (
                        <div key={pref.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`pref-${pref.id}`} 
                            name={`pref-${pref.id}`}
                            defaultChecked={mealPlan.preferences.includes(pref.id)}
                          />
                          <Label htmlFor={`pref-${pref.id}`} className="text-sm font-normal">
                            {pref.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setShowEditDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Edit Meal Dialog */}
          <Dialog open={showMealEditDialog} onOpenChange={setShowMealEditDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Meal</DialogTitle>
                <DialogDescription>
                  Update meal details
                </DialogDescription>
              </DialogHeader>
              <form action={handleSaveMealEdit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Meal Name</Label>
                    <Input id="name" name="name" defaultValue={editingMeal?.name || ''} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input id="calories" name="calories" type="number" defaultValue={editingMeal?.calories || 0} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setShowMealEditDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default MealPlanDetailsPage;
