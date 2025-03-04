
import React from "react";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MealPlansPage = () => {
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
                <Button size="sm">
                  <Plus size={16} className="mr-2" />
                  New Meal Plan
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Balanced Diet Plan</CardTitle>
                <CardDescription>General purpose nutrition plan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">A well-balanced meal plan with proper macro distribution suitable for most clients.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">12 clients using this plan</span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weight Loss Plan</CardTitle>
                <CardDescription>Calorie deficit focused plan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">A structured meal plan designed for healthy and sustainable weight loss.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">8 clients using this plan</span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Muscle Gain Plan</CardTitle>
                <CardDescription>High protein nutrition</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Protein-rich meal plan designed for clients focused on muscle development.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">5 clients using this plan</span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default MealPlansPage;
