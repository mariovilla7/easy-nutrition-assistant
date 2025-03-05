
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Plus, 
  Save, 
  Trash2, 
  CheckCircle2,
  XCircle, 
  ChevronDown,
  Utensils,
  Coffee,
  Apple,
  Pizza,
  Baby,
  Clock
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Food preference types
type Preference = {
  id: string;
  label: string;
  category: 'diet' | 'allergy' | 'dislike' | 'medical';
};

// Food items type
type FoodItem = {
  id: string;
  name: string;
  category: string; // protein, carb, vegetable, etc.
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  preferences: string[]; // preference ids this food matches
};

// Meal type
type Meal = {
  id: string;
  name: string;
  mealTime: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: FoodItem[];
  notes: string;
};

// Menu plan type
type MenuPlan = {
  id: string;
  name: string;
  description: string;
  calorieTarget: number;
  meals: Meal[];
  clientPreferences: string[]; // preference ids
};

// Sample data for preferences
const foodPreferences: Preference[] = [
  { id: 'vegan', label: 'Vegan', category: 'diet' },
  { id: 'vegetarian', label: 'Vegetarian', category: 'diet' },
  { id: 'pescatarian', label: 'Pescatarian', category: 'diet' },
  { id: 'keto', label: 'Keto', category: 'diet' },
  { id: 'paleo', label: 'Paleo', category: 'diet' },
  { id: 'glutenFree', label: 'Gluten Free', category: 'allergy' },
  { id: 'dairyFree', label: 'Dairy Free', category: 'allergy' },
  { id: 'nutFree', label: 'Nut Free', category: 'allergy' },
  { id: 'shellfish', label: 'Shellfish Allergy', category: 'allergy' },
  { id: 'soy', label: 'Soy Allergy', category: 'allergy' },
  { id: 'lowSodium', label: 'Low Sodium', category: 'medical' },
  { id: 'diabetic', label: 'Diabetic Friendly', category: 'medical' },
  { id: 'noCilantro', label: 'No Cilantro', category: 'dislike' },
  { id: 'noOnion', label: 'No Onion', category: 'dislike' },
  { id: 'noMushroom', label: 'No Mushrooms', category: 'dislike' },
];

// Sample food database
const foodDatabase: FoodItem[] = [
  {
    id: 'chicken',
    name: 'Grilled Chicken Breast',
    category: 'protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    preferences: ['glutenFree', 'dairyFree', 'nutFree', 'soFree', 'lowSodium', 'paleo']
  },
  {
    id: 'salmon',
    name: 'Salmon Fillet',
    category: 'protein',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    preferences: ['glutenFree', 'dairyFree', 'nutFree', 'pescatarian', 'paleo', 'keto']
  },
  {
    id: 'tofu',
    name: 'Firm Tofu',
    category: 'protein',
    calories: 144,
    protein: 17,
    carbs: 3.5,
    fat: 8.7,
    preferences: ['vegan', 'vegetarian', 'glutenFree', 'dairyFree', 'nutFree']
  },
  {
    id: 'rice',
    name: 'Brown Rice',
    category: 'carb',
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 1.8,
    preferences: ['vegan', 'vegetarian', 'glutenFree', 'dairyFree', 'nutFree', 'lowSodium']
  },
  {
    id: 'sweetPotato',
    name: 'Sweet Potato',
    category: 'carb',
    calories: 112,
    protein: 2,
    carbs: 26,
    fat: 0.1,
    preferences: ['vegan', 'vegetarian', 'glutenFree', 'dairyFree', 'nutFree', 'lowSodium', 'paleo']
  },
  {
    id: 'broccoli',
    name: 'Steamed Broccoli',
    category: 'vegetable',
    calories: 55,
    protein: 3.7,
    carbs: 11,
    fat: 0.6,
    preferences: ['vegan', 'vegetarian', 'glutenFree', 'dairyFree', 'nutFree', 'lowSodium', 'keto', 'paleo']
  },
  // Add more foods as needed
];

const CreateMenuPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for the menu plan
  const [menuPlan, setMenuPlan] = useState<MenuPlan>({
    id: `menu-${Date.now()}`,
    name: '',
    description: '',
    calorieTarget: 2000,
    meals: [
      {
        id: `meal-${Date.now()}`,
        name: 'Breakfast',
        mealTime: 'breakfast',
        foods: [],
        notes: ''
      }
    ],
    clientPreferences: []
  });
  
  // State for food search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMealId, setSelectedMealId] = useState<string | null>(menuPlan.meals[0].id);
  
  // State for filtered foods based on preferences
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>(foodDatabase);
  
  // State for currently displaying preferences category
  const [activePreferenceCategory, setActivePreferenceCategory] = useState<'diet' | 'allergy' | 'dislike' | 'medical'>('diet');

  // Filter foods by search term and preferences
  const getFilteredFoods = () => {
    return foodDatabase.filter(food => {
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
        food.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by selected preferences (if any)
      let matchesPreferences = true;
      if (menuPlan.clientPreferences.length > 0) {
        // Check if food matches all selected preferences
        // This is a simple implementation - in real app you'd have more complex logic
        matchesPreferences = menuPlan.clientPreferences.every(prefId => {
          const pref = foodPreferences.find(p => p.id === prefId);
          if (!pref) return true;
          
          if (pref.category === 'allergy' || pref.category === 'dislike') {
            // For allergies and dislikes, food should NOT have this preference
            return !food.preferences.includes(prefId);
          } else {
            // For diets and medical, food SHOULD have this preference
            return food.preferences.includes(prefId);
          }
        });
      }
      
      return matchesSearch && matchesPreferences;
    });
  };

  // Get preferences by category
  const getPreferencesByCategory = (category: 'diet' | 'allergy' | 'dislike' | 'medical') => {
    return foodPreferences.filter(pref => pref.category === category);
  };

  // Handle preference toggle
  const togglePreference = (prefId: string) => {
    setMenuPlan(prev => {
      if (prev.clientPreferences.includes(prefId)) {
        return {
          ...prev,
          clientPreferences: prev.clientPreferences.filter(id => id !== prefId)
        };
      } else {
        return {
          ...prev,
          clientPreferences: [...prev.clientPreferences, prefId]
        };
      }
    });
  };

  // Add a new meal to the plan
  const addMeal = () => {
    const newMeal: Meal = {
      id: `meal-${Date.now()}`,
      name: 'New Meal',
      mealTime: 'snack',
      foods: [],
      notes: ''
    };
    
    setMenuPlan(prev => ({
      ...prev,
      meals: [...prev.meals, newMeal]
    }));
    
    setSelectedMealId(newMeal.id);
  };

  // Remove a meal from the plan
  const removeMeal = (mealId: string) => {
    setMenuPlan(prev => ({
      ...prev,
      meals: prev.meals.filter(meal => meal.id !== mealId)
    }));
    
    if (selectedMealId === mealId && menuPlan.meals.length > 1) {
      setSelectedMealId(menuPlan.meals[0].id !== mealId ? menuPlan.meals[0].id : menuPlan.meals[1].id);
    }
  };

  // Update meal properties
  const updateMeal = (mealId: string, updates: Partial<Meal>) => {
    setMenuPlan(prev => ({
      ...prev,
      meals: prev.meals.map(meal => 
        meal.id === mealId ? { ...meal, ...updates } : meal
      )
    }));
  };

  // Add food to a meal
  const addFoodToMeal = (mealId: string, food: FoodItem) => {
    setMenuPlan(prev => ({
      ...prev,
      meals: prev.meals.map(meal => 
        meal.id === mealId 
          ? { ...meal, foods: [...meal.foods, food] } 
          : meal
      )
    }));
  };

  // Remove food from a meal
  const removeFoodFromMeal = (mealId: string, foodId: string) => {
    setMenuPlan(prev => ({
      ...prev,
      meals: prev.meals.map(meal => 
        meal.id === mealId 
          ? { ...meal, foods: meal.foods.filter(f => f.id !== foodId) } 
          : meal
      )
    }));
  };

  // Calculate current meal nutrition
  const calculateMealNutrition = (meal: Meal) => {
    return meal.foods.reduce((totals, food) => {
      return {
        calories: totals.calories + food.calories,
        protein: totals.protein + food.protein,
        carbs: totals.carbs + food.carbs,
        fat: totals.fat + food.fat
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  // Calculate total nutrition for the day
  const calculateTotalNutrition = () => {
    return menuPlan.meals.reduce((totals, meal) => {
      const mealNutrition = calculateMealNutrition(meal);
      return {
        calories: totals.calories + mealNutrition.calories,
        protein: totals.protein + mealNutrition.protein,
        carbs: totals.carbs + mealNutrition.carbs,
        fat: totals.fat + mealNutrition.fat
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const handleSaveMenu = () => {
    // Save menu logic would go here
    // For this demo, we'll just show a toast and navigate back
    toast({
      title: "Menu Plan Saved",
      description: `${menuPlan.name} has been saved successfully.`,
    });
    navigate("/meal-plans");
  };

  // Get the currently selected meal
  const selectedMeal = menuPlan.meals.find(meal => meal.id === selectedMealId) || menuPlan.meals[0];
  const selectedMealNutrition = calculateMealNutrition(selectedMeal);
  const totalNutrition = calculateTotalNutrition();
  
  return (
    <div className="min-h-screen bg-muted/20 dark:bg-background">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <Button variant="ghost" onClick={() => navigate("/meal-plans")} className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Meal Plans
          </Button>
          
          <header className="mb-6">
            <h1 className="text-2xl font-semibold md:text-3xl">Create Menu Plan</h1>
            <p className="text-sm text-muted-foreground">Design a custom meal plan for your clients</p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              {/* Menu Plan Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Menu Plan Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="menu-name">Plan Name</Label>
                      <Input 
                        id="menu-name" 
                        placeholder="e.g., Weight Loss Plan"
                        value={menuPlan.name}
                        onChange={(e) => setMenuPlan(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calorie-target">Daily Calorie Target</Label>
                      <Input 
                        id="calorie-target" 
                        type="number"
                        value={menuPlan.calorieTarget}
                        onChange={(e) => setMenuPlan(prev => ({ 
                          ...prev, 
                          calorieTarget: Number(e.target.value) 
                        }))}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Enter plan description..." 
                        className="min-h-[80px]"
                        value={menuPlan.description}
                        onChange={(e) => setMenuPlan(prev => ({ 
                          ...prev, 
                          description: e.target.value 
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Food Preferences */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Food Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs 
                    defaultValue="diet"
                    value={activePreferenceCategory}
                    onValueChange={(value) => setActivePreferenceCategory(value as any)}
                  >
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="diet">Diet Type</TabsTrigger>
                      <TabsTrigger value="allergy">Allergies</TabsTrigger>
                      <TabsTrigger value="medical">Medical</TabsTrigger>
                      <TabsTrigger value="dislike">Dislikes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="diet" className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {getPreferencesByCategory('diet').map(pref => (
                          <div 
                            key={pref.id}
                            className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors
                              ${menuPlan.clientPreferences.includes(pref.id) 
                                ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                                : 'hover:bg-muted/50'}`}
                            onClick={() => togglePreference(pref.id)}
                          >
                            <div className="shrink-0">
                              {menuPlan.clientPreferences.includes(pref.id) 
                                ? <CheckCircle2 className="h-5 w-5 text-primary" /> 
                                : <div className="h-5 w-5 rounded-full border-2" />}
                            </div>
                            <span>{pref.label}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="allergy" className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {getPreferencesByCategory('allergy').map(pref => (
                          <div 
                            key={pref.id}
                            className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors
                              ${menuPlan.clientPreferences.includes(pref.id) 
                                ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                                : 'hover:bg-muted/50'}`}
                            onClick={() => togglePreference(pref.id)}
                          >
                            <div className="shrink-0">
                              {menuPlan.clientPreferences.includes(pref.id) 
                                ? <CheckCircle2 className="h-5 w-5 text-primary" /> 
                                : <div className="h-5 w-5 rounded-full border-2" />}
                            </div>
                            <span>{pref.label}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="medical" className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {getPreferencesByCategory('medical').map(pref => (
                          <div 
                            key={pref.id}
                            className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors
                              ${menuPlan.clientPreferences.includes(pref.id) 
                                ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                                : 'hover:bg-muted/50'}`}
                            onClick={() => togglePreference(pref.id)}
                          >
                            <div className="shrink-0">
                              {menuPlan.clientPreferences.includes(pref.id) 
                                ? <CheckCircle2 className="h-5 w-5 text-primary" /> 
                                : <div className="h-5 w-5 rounded-full border-2" />}
                            </div>
                            <span>{pref.label}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="dislike" className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {getPreferencesByCategory('dislike').map(pref => (
                          <div 
                            key={pref.id}
                            className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors
                              ${menuPlan.clientPreferences.includes(pref.id) 
                                ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                                : 'hover:bg-muted/50'}`}
                            onClick={() => togglePreference(pref.id)}
                          >
                            <div className="shrink-0">
                              {menuPlan.clientPreferences.includes(pref.id) 
                                ? <CheckCircle2 className="h-5 w-5 text-primary" /> 
                                : <div className="h-5 w-5 rounded-full border-2" />}
                            </div>
                            <span>{pref.label}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  {menuPlan.clientPreferences.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {menuPlan.clientPreferences.map(prefId => {
                          const pref = foodPreferences.find(p => p.id === prefId);
                          if (!pref) return null;
                          
                          return (
                            <Badge key={prefId} variant="outline" className="flex items-center gap-1">
                              {pref.label}
                              <XCircle 
                                className="h-3.5 w-3.5 cursor-pointer ml-1" 
                                onClick={() => togglePreference(prefId)}
                              />
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Meal Planner */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Meal Planner</CardTitle>
                    <Button size="sm" onClick={addMeal}>
                      <Plus size={16} className="mr-2" />
                      Add Meal
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
                    {/* Meal selector sidebar */}
                    <div className="space-y-2">
                      {menuPlan.meals.map(meal => (
                        <div
                          key={meal.id}
                          className={`flex items-center justify-between p-3 rounded-md cursor-pointer
                            ${selectedMealId === meal.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted/50'
                            }`}
                          onClick={() => setSelectedMealId(meal.id)}
                        >
                          <div className="flex items-center gap-2">
                            {meal.mealTime === 'breakfast' && <Coffee size={16} />}
                            {meal.mealTime === 'lunch' && <Utensils size={16} />}
                            {meal.mealTime === 'dinner' && <Utensils size={16} />}
                            {meal.mealTime === 'snack' && <Apple size={16} />}
                            <span>{meal.name}</span>
                          </div>
                          {menuPlan.meals.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-5 w-5 ${
                                selectedMealId === meal.id
                                  ? 'text-primary-foreground hover:text-primary-foreground/90'
                                  : 'text-muted-foreground'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                removeMeal(meal.id);
                              }}
                            >
                              <Trash2 size={14} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Meal editor */}
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="meal-name">Meal Name</Label>
                          <Input
                            id="meal-name"
                            value={selectedMeal.name}
                            onChange={(e) => updateMeal(selectedMeal.id, { name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="meal-time">Meal Time</Label>
                          <Select
                            value={selectedMeal.mealTime}
                            onValueChange={(value) => updateMeal(
                              selectedMeal.id, 
                              { mealTime: value as 'breakfast' | 'lunch' | 'dinner' | 'snack' }
                            )}
                          >
                            <SelectTrigger id="meal-time">
                              <SelectValue placeholder="Select meal time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="breakfast">Breakfast</SelectItem>
                              <SelectItem value="lunch">Lunch</SelectItem>
                              <SelectItem value="dinner">Dinner</SelectItem>
                              <SelectItem value="snack">Snack</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Foods</Label>
                        {selectedMeal.foods.length === 0 ? (
                          <div className="border rounded-md p-8 text-center">
                            <p className="text-muted-foreground">No foods added to this meal yet</p>
                            <p className="text-sm text-muted-foreground mt-1">Use the food search below to add items</p>
                          </div>
                        ) : (
                          <div className="border rounded-md divide-y">
                            {selectedMeal.foods.map(food => (
                              <div key={food.id} className="flex items-center justify-between p-3">
                                <div>
                                  <p className="font-medium">{food.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFoodFromMeal(selectedMeal.id, food.id)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Add any preparation notes or instructions..."
                          value={selectedMeal.notes}
                          onChange={(e) => updateMeal(selectedMeal.id, { notes: e.target.value })}
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <div className="mt-4 p-3 bg-muted/30 rounded-md">
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Calories</p>
                            <p className="font-semibold">{selectedMealNutrition.calories}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Protein</p>
                            <p className="font-semibold">{selectedMealNutrition.protein}g</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Carbs</p>
                            <p className="font-semibold">{selectedMealNutrition.carbs}g</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Fat</p>
                            <p className="font-semibold">{selectedMealNutrition.fat}g</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              {/* Food Search */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Food Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="Search foods..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <ScrollArea className="h-[400px] rounded-md border">
                      <div className="p-4 divide-y">
                        {getFilteredFoods().map(food => (
                          <div 
                            key={food.id}
                            className="py-3 first:pt-0 last:pb-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{food.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                </p>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => addFoodToMeal(selectedMeal.id, food)}
                              >
                                <Plus size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {getFilteredFoods().length === 0 && (
                          <div className="py-8 text-center">
                            <p className="text-muted-foreground">No matching foods found</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
              
              {/* Nutrition Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Nutrition Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md bg-muted/20">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Total Calories</p>
                          <p className="text-2xl font-bold">{totalNutrition.calories}</p>
                          <p className="text-xs text-muted-foreground">
                            out of {menuPlan.calorieTarget} target
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Meals</p>
                          <p className="text-2xl font-bold">{menuPlan.meals.length}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Protein</p>
                          <p className="font-semibold">{totalNutrition.protein}g</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Carbs</p>
                          <p className="font-semibold">{totalNutrition.carbs}g</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fat</p>
                          <p className="font-semibold">{totalNutrition.fat}g</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full" onClick={handleSaveMenu}>
                      <Save size={16} className="mr-2" />
                      Save Menu Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CreateMenuPage;
