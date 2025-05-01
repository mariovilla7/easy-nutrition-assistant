
import React from "react";
import { CalendarDays, ChevronRight, ChevronUp, FileText, ShoppingBag } from "lucide-react";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import IconButton from "@/components/common/IconButton";

const ClientMealPlans = () => {
  const { toast } = useToast();
  
  // Mock data for the current meal plan
  const currentPlan = {
    id: 1,
    name: "Weight Loss Plan",
    description: "A balanced meal plan designed to help with gradual weight loss while maintaining energy levels.",
    startDate: "May 1, 2023",
    endDate: "May 31, 2023",
    days: [
      {
        name: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Greek Yogurt with Berries",
            calories: 320,
            protein: "18g",
            carbs: "45g",
            fat: "10g"
          },
          {
            type: "Lunch",
            name: "Grilled Chicken Salad",
            calories: 450,
            protein: "35g",
            carbs: "25g",
            fat: "22g"
          },
          {
            type: "Dinner",
            name: "Baked Salmon with Vegetables",
            calories: 520,
            protein: "40g",
            carbs: "30g",
            fat: "25g"
          },
          {
            type: "Snack",
            name: "Apple with Almond Butter",
            calories: 200,
            protein: "5g",
            carbs: "25g",
            fat: "10g"
          }
        ]
      },
      {
        name: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Vegetable Omelette",
            calories: 350,
            protein: "22g",
            carbs: "15g",
            fat: "23g"
          },
          {
            type: "Lunch",
            name: "Quinoa Bowl with Avocado",
            calories: 480,
            protein: "18g",
            carbs: "65g",
            fat: "18g"
          },
          {
            type: "Dinner",
            name: "Turkey Meatballs with Zucchini Noodles",
            calories: 490,
            protein: "38g",
            carbs: "22g",
            fat: "26g"
          },
          {
            type: "Snack",
            name: "Greek Yogurt with Honey",
            calories: 180,
            protein: "15g",
            carbs: "20g",
            fat: "5g"
          }
        ]
      }
    ]
  };

  // Sample shopping list items
  const shoppingListItems = [
    { id: 1, name: "Greek Yogurt", category: "Dairy", checked: false },
    { id: 2, name: "Berries (Mixed)", category: "Fruits", checked: false },
    { id: 3, name: "Chicken Breast", category: "Meat", checked: false },
    { id: 4, name: "Salmon Fillet", category: "Fish", checked: false },
    { id: 5, name: "Mixed Salad Greens", category: "Vegetables", checked: false },
    { id: 6, name: "Quinoa", category: "Grains", checked: false },
    { id: 7, name: "Avocado", category: "Fruits", checked: false },
    { id: 8, name: "Almond Butter", category: "Nuts & Seeds", checked: false },
    { id: 9, name: "Eggs", category: "Dairy", checked: false },
    { id: 10, name: "Olive Oil", category: "Oils", checked: false },
  ];

  const handleDownloadPDF = () => {
    toast({
      description: "Meal plan PDF downloaded successfully",
    });
  };

  const handlePrintMealPlan = () => {
    toast({
      description: "Preparing meal plan for printing...",
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">My Meal Plans</h1>
                <p className="text-sm text-muted-foreground">View and manage your nutrition plans</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handlePrintMealPlan}>
                  Print Plan
                </Button>
                <Button size="sm" onClick={handleDownloadPDF}>
                  <FileText size={16} className="mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </header>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle>{currentPlan.name}</CardTitle>
                  <CardDescription className="mt-1">{currentPlan.description}</CardDescription>
                </div>
                <Badge className="w-fit">Current Plan</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <CalendarDays size={16} className="mr-1" />
                <span>{currentPlan.startDate} to {currentPlan.endDate}</span>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="meal-plan">
            <TabsList className="mb-4">
              <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
              <TabsTrigger value="shopping-list">Shopping List</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="meal-plan">
              <div className="grid gap-6">
                {currentPlan.days.map((day, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{day.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {day.meals.map((meal, mealIndex) => (
                          <div key={mealIndex} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{meal.type}: {meal.name}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <span className="text-xs bg-muted rounded-full px-2 py-0.5">
                                    {meal.calories} cal
                                  </span>
                                  <span className="text-xs bg-muted rounded-full px-2 py-0.5">
                                    Protein: {meal.protein}
                                  </span>
                                  <span className="text-xs bg-muted rounded-full px-2 py-0.5">
                                    Carbs: {meal.carbs}
                                  </span>
                                  <span className="text-xs bg-muted rounded-full px-2 py-0.5">
                                    Fat: {meal.fat}
                                  </span>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <ChevronRight size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="shopping-list">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Shopping List</CardTitle>
                  <CardDescription>Items you need for your meal plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Dairy', 'Meat', 'Fish', 'Vegetables', 'Fruits', 'Grains', 'Nuts & Seeds', 'Oils'].map(category => {
                      const items = shoppingListItems.filter(item => item.category === category);
                      if (items.length === 0) return null;
                      
                      return (
                        <div key={category}>
                          <h3 className="font-medium mb-2">{category}</h3>
                          <div className="space-y-2">
                            {items.map(item => (
                              <div 
                                key={item.id} 
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="checkbox" 
                                    id={`item-${item.id}`} 
                                    className="h-4 w-4 rounded border-gray-300"
                                    defaultChecked={item.checked}
                                  />
                                  <label 
                                    htmlFor={`item-${item.id}`}
                                    className={`${item.checked ? 'line-through text-muted-foreground' : ''}`}
                                  >
                                    {item.name}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ShoppingBag size={16} className="mr-2" />
                      Export Shopping List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nutrition">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nutrition Overview</CardTitle>
                  <CardDescription>Weekly nutrition targets and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Daily Averages</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-muted/50 p-4 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">Calories</p>
                          <p className="text-2xl font-medium">1,650</p>
                          <p className="text-xs text-muted-foreground">per day</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">Protein</p>
                          <p className="text-2xl font-medium">110g</p>
                          <p className="text-xs text-muted-foreground">30% of calories</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">Carbs</p>
                          <p className="text-2xl font-medium">165g</p>
                          <p className="text-xs text-muted-foreground">40% of calories</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">Fat</p>
                          <p className="text-2xl font-medium">55g</p>
                          <p className="text-xs text-muted-foreground">30% of calories</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Notes from Your Nutritionist</h3>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="text-sm">This meal plan is designed to create a moderate calorie deficit while ensuring you get all essential nutrients. Focus on drinking plenty of water and try to eat your meals at regular times each day.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AnimatedTransition>
      </main>
      
      <div className="fixed bottom-4 right-4">
        <IconButton
          icon={ChevronUp}
          size="lg"
          className="shadow-md"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        />
      </div>
    </div>
  );
};

export default ClientMealPlans;
