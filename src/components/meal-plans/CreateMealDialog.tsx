
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Brain, Plus, List, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CreateMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateMealDialog: React.FC<CreateMealDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mealPlanName, setMealPlanName] = useState("");
  const [mealPlanDescription, setMealPlanDescription] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");

  const handleManualCreate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mealPlanName.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your meal plan",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save the meal plan to a database
    toast({
      title: "Meal plan created",
      description: "Your meal plan has been created successfully",
    });
    
    onOpenChange(false);
    // Navigate to the new meal plan page (in a real app, this would use the new meal plan's ID)
    navigate(`/meal-plans/new`);
  };

  const handleAICreate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aiPrompt.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide instructions for the AI",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Generating meal plan",
      description: "AI is creating your meal plan based on your requirements",
    });
    
    // Simulate AI generation delay
    setTimeout(() => {
      toast({
        title: "Meal plan created",
        description: "Your AI-generated meal plan is ready",
      });
      onOpenChange(false);
      navigate(`/meal-plans/ai-generated`);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Utensils size={18} />
            Create New Meal Plan
          </DialogTitle>
          <DialogDescription>
            Create a meal plan manually or with AI assistance
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="manual" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <List size={16} />
              Manual Creation
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain size={16} />
              AI Assistance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="mt-4 space-y-4">
            <form onSubmit={handleManualCreate}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Meal Plan Name</Label>
                  <Input 
                    id="name" 
                    value={mealPlanName}
                    onChange={(e) => setMealPlanName(e.target.value)}
                    placeholder="e.g., Mediterranean Diet Plan"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={mealPlanDescription}
                    onChange={(e) => setMealPlanDescription(e.target.value)}
                    placeholder="Brief description of the meal plan and its benefits"
                    rows={3}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Meal Structure</Label>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        You'll be redirected to the meal plan editor to add individual meals.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">
                  <Plus size={16} className="mr-2" />
                  Create & Continue
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="ai" className="mt-4 space-y-4">
            <form onSubmit={handleAICreate}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="ai-prompt">Tell AI what to create</Label>
                  <Textarea 
                    id="ai-prompt" 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g., Create a 7-day weight loss meal plan with Mediterranean foods, 1800 calories per day, high protein, suitable for lactose intolerant individuals"
                    rows={5}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>AI Suggestions</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAiPrompt("Create a 7-day weight loss meal plan, 1500 calories per day")}
                    >
                      Weight Loss Plan
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAiPrompt("Create a high-protein meal plan for muscle building, 2500 calories per day")}
                    >
                      Muscle Gain Plan
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAiPrompt("Create a vegetarian meal plan with balanced macros")}
                    >
                      Vegetarian Plan
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" className="flex items-center gap-2">
                  <Brain size={16} />
                  Generate with AI
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMealDialog;
