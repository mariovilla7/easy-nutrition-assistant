import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ShoppingList from "@/components/meal-plans/ShoppingList";
import TabView from "@/components/common/TabView";
import { 
  ArrowLeft, 
  PenLine, 
  Trash, 
  Copy, 
  ShoppingCart, 
  User, 
  Calendar, 
  Plus, 
  Save, 
  Users, 
  Check,
  X,
  ListChecks,
  Utensils,
  Clock
} from "lucide-react";

const sampleMealPlan = {
  id: "1",
  title: "Balanced Diet Plan",
  description: "A well-balanced meal plan with proper macro distribution suitable for most clients.",
  tags: ["balanced", "general", "macronutrient-focused"],
  createdAt: "2023-08-15",
  updatedAt: "2023-09-01",
  assignedClients: 12,
  calories: 2100,
  protein: 130,
  carbs: 210,
  fat: 70,
  meals: [
    {
      id: "m1",
      title: "Breakfast",
      time: "7:30 AM",
      foods: [
        { id: "f1", name: "Scrambled eggs", quantity: "2 eggs", calories: 180, protein: 12, carbs: 2, fat: 10 },
        { id: "f2", name: "Whole grain toast", quantity: "1 slice", calories: 80, protein: 3, carbs: 15, fat: 1 },
        { id: "f3", name: "Avocado", quantity: "1/2", calories: 120, protein: 1, carbs: 6, fat: 10 },
        { id: "f4", name: "Fresh berries", quantity: "1/2 cup", calories: 40, protein: 0, carbs: 10, fat: 0 }
      ]
    },
    {
      id: "m2",
      title: "Morning Snack",
      time: "10:00 AM",
      foods: [
        { id: "f5", name: "Greek yogurt", quantity: "1 cup", calories: 120, protein: 20, carbs: 8, fat: 0 },
        { id: "f6", name: "Almonds", quantity: "1 oz", calories: 170, protein: 6, carbs: 5, fat: 15 }
      ]
    },
    {
      id: "m3",
      title: "Lunch",
      time: "12:30 PM",
      foods: [
        { id: "f7", name: "Grilled chicken breast", quantity: "4 oz", calories: 180, protein: 36, carbs: 0, fat: 4 },
        { id: "f8", name: "Quinoa", quantity: "1/2 cup", calories: 110, protein: 4, carbs: 20, fat: 2 },
        { id: "f9", name: "Mixed vegetables", quantity: "1 cup", calories: 60, protein: 2, carbs: 12, fat: 0 },
        { id: "f10", name: "Olive oil dressing", quantity: "1 tbsp", calories: 120, protein: 0, carbs: 0, fat: 14 }
      ]
    },
    {
      id: "m4",
      title: "Afternoon Snack",
      time: "3:30 PM",
      foods: [
        { id: "f11", name: "Protein shake", quantity: "1 serving", calories: 130, protein: 25, carbs: 5, fat: 1 },
        { id: "f12", name: "Banana", quantity: "1 medium", calories: 110, protein: 1, carbs: 28, fat: 0 }
      ]
    },
    {
      id: "m5",
      title: "Dinner",
      time: "7:00 PM",
      foods: [
        { id: "f13", name: "Salmon fillet", quantity: "4 oz", calories: 200, protein: 22, carbs: 0, fat: 12 },
        { id: "f14", name: "Brown rice", quantity: "1/2 cup", calories: 110, protein: 2, carbs: 22, fat: 1 },
        { id: "f15", name: "Steamed broccoli", quantity: "1 cup", calories: 55, protein: 4, carbs: 10, fat: 0 },
        { id: "f16", name: "Lemon garlic sauce", quantity: "2 tbsp", calories: 45, protein: 0, carbs: 2, fat: 4 }
      ]
    }
  ],
  preferences: [
    { id: "p1", name: "Gluten-free", category: "allergy" },
    { id: "p2", name: "High-protein", category: "diet" }
  ],
  instructions: "Follow this meal plan 5 days a week. On weekends, maintain similar macronutrient distribution but feel free to substitute foods based on preference. Stay hydrated by drinking at least 2L of water daily.",
  notes: "This plan is designed for individuals with moderate activity levels. Adjust portion sizes based on specific caloric needs."
};

const sampleClients = [
  { id: "1", name: "Emma Thompson", email: "emma@example.com", isAssigned: true },
  { id: "2", name: "James Wilson", email: "james@example.com", isAssigned: false },
  { id: "3", name: "Sophia Martinez", email: "sophia@example.com", isAssigned: true },
  { id: "4", name: "Noah Garcia", email: "noah@example.com", isAssigned: false },
  { id: "5", name: "Olivia Johnson", email: "olivia@example.com", isAssigned: false },
  { id: "6", name: "William Brown", email: "william@example.com", isAssigned: false },
  { id: "7", name: "Ava Davis", email: "ava@example.com", isAssigned: false },
  { id: "8", name: "Benjamin Miller", email: "benjamin@example.com", isAssigned: false }
];

const MealPlanDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [mealPlan, setMealPlan] = useState(sampleMealPlan);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMealPlan, setEditedMealPlan] = useState(sampleMealPlan);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [clients, setClients] = useState(sampleClients);
  const [activeTab, setActiveTab] = useState("overview");

  const handleEditToggle = () => {
    if (isEditing) {
      setMealPlan(editedMealPlan);
      toast({
        title: "Changes saved",
        description: "Meal plan has been updated successfully",
      });
    } else {
      setEditedMealPlan(mealPlan);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedMealPlan(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteMealPlan = () => {
    toast({
      title: "Meal plan deleted",
      description: "The meal plan has been removed",
    });
    navigate("/meal-plans");
  };

  const handleDuplicateMealPlan = () => {
    toast({
      title: "Meal plan duplicated",
      description: "A copy of this meal plan has been created",
    });
    navigate("/meal-plans");
  };

  const handleUpdateClientAssignment = (clientId: string, assign: boolean) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, isAssigned: assign } : client
    ));
    
    toast({
      description: assign 
        ? "Client has been assigned to this meal plan" 
        : "Client has been removed from this meal plan",
    });
  };

  const assignedClientsCount = clients.filter(client => client.isAssigned).length;

  const handleGenerateShoppingList = () => {
    setActiveTab("shopping");
    toast({
      description: "Generating shopping list...",
    });
  };

  const handleScheduleNotification = (formData: FormData) => {
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;
    const date = formData.get("date") as string;
    
    toast({
      title: "Notification scheduled",
      description: `"${title}" will be sent to assigned clients on ${date}`,
    });
  };

  const handleUpdateMeal = (formData: FormData) => {
    const mealId = formData.get("mealId") as string;
    const title = formData.get("title") as string;
    const time = formData.get("time") as string;
    
    setEditedMealPlan(prev => ({
      ...prev,
      meals: prev.meals.map(meal => 
        meal.id === mealId ? { ...meal, title, time } : meal
      )
    }));
    
    toast({
      description: `${title} has been updated`,
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <Button variant="ghost" onClick={() => navigate("/meal-plans")} className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Meal Plans
          </Button>
          
          <header className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">{mealPlan.title}</h1>
                <p className="text-sm text-muted-foreground">{mealPlan.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {mealPlan.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="bg-primary/10">
                    {mealPlan.calories} calories
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleEditToggle}>
                  {isEditing ? (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <PenLine size={16} className="mr-2" />
                      Edit Plan
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDuplicateMealPlan}>
                  <Copy size={16} className="mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" onClick={handleDeleteMealPlan}>
                  <Trash size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="meals">Meals</TabsTrigger>
                  <TabsTrigger value="shopping">Shopping List</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="animate-in fade-in-50 duration-300">
                  {isEditing ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Edit Plan Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Plan Title</Label>
                          <Input 
                            id="title" 
                            value={editedMealPlan.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea 
                            id="description"
                            value={editedMealPlan.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            rows={3}
                          />
                        </div>
                        
                        <div className="grid gap-4 sm:grid-cols-4">
                          <div className="space-y-2">
                            <Label htmlFor="calories">Calories</Label>
                            <Input 
                              id="calories" 
                              type="number"
                              value={editedMealPlan.calories}
                              onChange={(e) => handleInputChange("calories", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="protein">Protein (g)</Label>
                            <Input 
                              id="protein" 
                              type="number"
                              value={editedMealPlan.protein}
                              onChange={(e) => handleInputChange("protein", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="carbs">Carbs (g)</Label>
                            <Input 
                              id="carbs" 
                              type="number"
                              value={editedMealPlan.carbs}
                              onChange={(e) => handleInputChange("carbs", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="fat">Fat (g)</Label>
                            <Input 
                              id="fat" 
                              type="number"
                              value={editedMealPlan.fat}
                              onChange={(e) => handleInputChange("fat", e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="instructions">Instructions</Label>
                          <Textarea 
                            id="instructions"
                            value={editedMealPlan.instructions}
                            onChange={(e) => handleInputChange("instructions", e.target.value)}
                            rows={4}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea 
                            id="notes"
                            value={editedMealPlan.notes}
                            onChange={(e) => handleInputChange("notes", e.target.value)}
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>Nutritional Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-4 gap-4 text-center">
                            <div className="rounded-md bg-muted/50 p-3">
                              <p className="text-sm text-muted-foreground">Calories</p>
                              <p className="text-2xl font-bold">{mealPlan.calories}</p>
                              <p className="text-xs text-muted-foreground">kcal</p>
                            </div>
                            <div className="rounded-md bg-muted/50 p-3">
                              <p className="text-sm text-muted-foreground">Protein</p>
                              <p className="text-2xl font-bold">{mealPlan.protein}</p>
                              <p className="text-xs text-muted-foreground">grams</p>
                            </div>
                            <div className="rounded-md bg-muted/50 p-3">
                              <p className="text-sm text-muted-foreground">Carbs</p>
                              <p className="text-2xl font-bold">{mealPlan.carbs}</p>
                              <p className="text-xs text-muted-foreground">grams</p>
                            </div>
                            <div className="rounded-md bg-muted/50 p-3">
                              <p className="text-sm text-muted-foreground">Fat</p>
                              <p className="text-2xl font-bold">{mealPlan.fat}</p>
                              <p className="text-xs text-muted-foreground">grams</p>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <div className="mb-2 flex items-center justify-between">
                              <p className="font-medium">Macronutrient Distribution</p>
                              <div className="flex gap-4">
                                <div className="flex items-center gap-1">
                                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                  <span className="text-xs">Protein</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                  <span className="text-xs">Carbs</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                  <span className="text-xs">Fat</span>
                                </div>
                              </div>
                            </div>
                            <div className="h-4 w-full overflow-hidden rounded-full bg-muted/50">
                              <div className="flex h-full">
                                <div className="bg-blue-500" style={{ width: `${(mealPlan.protein * 4 / (mealPlan.protein * 4 + mealPlan.carbs * 4 + mealPlan.fat * 9)) * 100}%` }}></div>
                                <div className="bg-green-500" style={{ width: `${(mealPlan.carbs * 4 / (mealPlan.protein * 4 + mealPlan.carbs * 4 + mealPlan.fat * 9)) * 100}%` }}></div>
                                <div className="bg-amber-500" style={{ width: `${(mealPlan.fat * 9 / (mealPlan.protein * 4 + mealPlan.carbs * 4 + mealPlan.fat * 9)) * 100}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>Dietary Preferences</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {mealPlan.preferences.map(pref => (
                                <div key={pref.id} className="flex items-center justify-between rounded-md border p-3">
                                  <div className="flex items-center gap-2">
                                    <ListChecks className="h-5 w-5 text-primary" />
                                    <span>{pref.name}</span>
                                  </div>
                                  <Badge variant="outline" className="capitalize">
                                    {pref.category}
                                  </Badge>
                                </div>
                              ))}
                              {mealPlan.preferences.length === 0 && (
                                <p className="text-sm text-muted-foreground">No specific dietary preferences set for this plan.</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle>Plan Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <h3 className="mb-1 text-sm font-medium">Instructions</h3>
                                <p className="text-sm text-muted-foreground">{mealPlan.instructions}</p>
                              </div>
                              <div>
                                <h3 className="mb-1 text-sm font-medium">Notes</h3>
                                <p className="text-sm text-muted-foreground">{mealPlan.notes}</p>
                              </div>
                              <div>
                                <h3 className="mb-1 text-sm font-medium">Created</h3>
                                <p className="text-sm text-muted-foreground">{new Date(mealPlan.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <h3 className="mb-1 text-sm font-medium">Last Updated</h3>
                                <p className="text-sm text-muted-foreground">{new Date(mealPlan.updatedAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="meals" className="animate-in fade-in-50 duration-300">
                  {mealPlan.meals.map((meal) => (
                    <Card key={meal.id} className="mb-6 overflow-hidden">
                      <CardHeader className="bg-muted/50 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-muted-foreground" />
                            <CardTitle className="text-base">{meal.title} - {meal.time}</CardTitle>
                          </div>
                          
                          {isEditing && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <PenLine size={14} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Meal</DialogTitle>
                                  <DialogDescription>
                                    Update the details for this meal
                                  </DialogDescription>
                                </DialogHeader>
                                <form action="" onSubmit={(e) => { e.preventDefault(); handleUpdateMeal(new FormData(e.currentTarget)); }}>
                                  <input type="hidden" name="mealId" value={meal.id} />
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor={`meal-title-${meal.id}`}>Meal Title</Label>
                                      <Input
                                        id={`meal-title-${meal.id}`}
                                        name="title"
                                        defaultValue={meal.title}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor={`meal-time-${meal.id}`}>Time</Label>
                                      <Input
                                        id={`meal-time-${meal.id}`}
                                        name="time"
                                        defaultValue={meal.time}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <table className="w-full">
                          <thead className="bg-muted/30">
                            <tr>
                              <th className="w-full py-2 pl-6 text-left text-sm font-medium">Food</th>
                              <th className="whitespace-nowrap py-2 px-4 text-right text-sm font-medium">Quantity</th>
                              <th className="whitespace-nowrap py-2 px-4 text-right text-sm font-medium">Calories</th>
                              <th className="whitespace-nowrap py-2 px-4 text-right text-sm font-medium">Protein</th>
                              <th className="whitespace-nowrap py-2 px-4 text-right text-sm font-medium">Carbs</th>
                              <th className="whitespace-nowrap py-2 pr-6 text-right text-sm font-medium">Fat</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {meal.foods.map((food) => (
                              <tr key={food.id}>
                                <td className="py-3 pl-6 text-sm">{food.name}</td>
                                <td className="whitespace-nowrap py-3 px-4 text-right text-sm text-muted-foreground">{food.quantity}</td>
                                <td className="whitespace-nowrap py-3 px-4 text-right text-sm">{food.calories}</td>
                                <td className="whitespace-nowrap py-3 px-4 text-right text-sm">{food.protein}g</td>
                                <td className="whitespace-nowrap py-3 px-4 text-right text-sm">{food.carbs}g</td>
                                <td className="whitespace-nowrap py-3 pr-6 text-right text-sm">{food.fat}g</td>
                              </tr>
                            ))}
                            <tr className="bg-muted/30">
                              <td className="py-2 pl-6 text-sm font-medium">Total</td>
                              <td></td>
                              <td className="whitespace-nowrap py-2 px-4 text-right text-sm font-medium">
                                {meal.foods.reduce((sum, food) => sum + food.calories, 0)}
                              </td>
                              <td className="whitespace-nowrap py-2 px-4 text-right text-sm font-medium">
                                {meal.foods.reduce((sum, food) => sum + food.protein, 0)}g
                              </td>
                              <td className="whitespace-nowrap py-2 px-4 text-right text-sm font-medium">
                                {meal.foods.reduce((sum, food) => sum + food.carbs, 0)}g
                              </td>
                              <td className="whitespace-nowrap py-2 pr-6 text-right text-sm font-medium">
                                {meal.foods.reduce((sum, food) => sum + food.fat, 0)}g
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="shopping" className="animate-in fade-in-50 duration-300">
                  <ShoppingList mealPlanId={mealPlan.id} />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Client Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{assignedClientsCount} assigned clients</span>
                    </div>
                    <Button size="sm" onClick={() => setIsClientDialogOpen(true)}>
                      <User size={14} className="mr-2" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={handleGenerateShoppingList}>
                    <ShoppingCart size={16} className="mr-2" />
                    Generate Shopping List
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar size={16} className="mr-2" />
                        Schedule Notification
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Schedule Notification</DialogTitle>
                        <DialogDescription>
                          Send a notification to clients assigned to this meal plan
                        </DialogDescription>
                      </DialogHeader>
                      <form action="" onSubmit={(e) => { e.preventDefault(); handleScheduleNotification(new FormData(e.currentTarget)); }}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="Notification title" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Enter message for clients"
                              rows={3}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="date">Send Date</Label>
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              defaultValue={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Schedule</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Manage Client Assignments</DialogTitle>
                <DialogDescription>
                  Assign this meal plan to clients or remove existing assignments
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4">
                  <Input placeholder="Search clients..." />
                </div>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.email}</p>
                        </div>
                        {client.isAssigned ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-destructive"
                            onClick={() => handleUpdateClientAssignment(client.id, false)}
                          >
                            <X size={14} />
                            Remove
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleUpdateClientAssignment(client.id, true)}
                          >
                            <Plus size={14} />
                            Assign
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsClientDialogOpen(false)}>Done</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default MealPlanDetailsPage;
