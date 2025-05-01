
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MessageSquare,
  ChevronUp,
  Clock,
  Utensils,
  CalendarDays
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import IconButton from "@/components/common/IconButton";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleScheduleAppointment = () => {
    navigate("/calendar");
  };

  const handleViewMealPlans = () => {
    navigate("/meal-plans");
  };

  const handleViewMessages = () => {
    navigate("/messages");
  };

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      title: "Nutrition Consultation",
      date: addDays(new Date(), 2),
      nutritionist: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "Progress Review",
      date: addDays(new Date(), 7),
      nutritionist: "Dr. Sarah Johnson"
    }
  ];

  // Mock data for assigned meal plans
  const assignedMealPlans = [
    {
      id: 1,
      name: "Weight Loss Plan",
      startDate: new Date(),
      endDate: addDays(new Date(), 30),
      progress: 15
    }
  ];

  // Mock data for latest measurements
  const latestMeasurements = {
    weight: "142 lbs",
    BMI: "24.5",
    bodyFat: "22%",
    lastUpdated: "1 week ago"
  };

  return (
    <div className="min-h-screen bg-muted/20 dark:bg-background">
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Welcome, Jane!</h1>
                <p className="text-sm text-muted-foreground">Here's your nutrition dashboard</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex" onClick={handleScheduleAppointment}>
                  <Calendar size={16} className="mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Current Plan Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Your Current Plan</CardTitle>
                <CardDescription>Weight Loss Plan - Week 2</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Today's Meals</h4>
                    <div className="grid gap-2">
                      {["Breakfast", "Lunch", "Dinner", "Snack"].map((meal) => (
                        <div key={meal} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{meal}</p>
                            <p className="text-sm text-muted-foreground">View your planned meal</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleViewMealPlans}>
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-3 flex justify-center">
                    <Button onClick={handleViewMealPlans}>
                      View Full Meal Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
                <CardDescription>Latest measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="text-lg font-medium">{latestMeasurements.weight}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">BMI</p>
                      <p className="text-lg font-medium">{latestMeasurements.BMI}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Body Fat</p>
                      <p className="text-lg font-medium">{latestMeasurements.bodyFat}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="text-lg font-medium">{latestMeasurements.lastUpdated}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 flex justify-center">
                    <Button variant="outline">
                      Update Measurements
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div 
                          key={session.id} 
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                        >
                          <div>
                            <p className="font-medium">{session.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CalendarDays size={14} />
                              <span>{format(session.date, 'MMM dd, yyyy - h:mm a')}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">With {session.nutritionist}</p>
                          </div>
                          <Badge variant="outline">Upcoming</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-3">No upcoming sessions</p>
                    <Button variant="outline" size="sm" onClick={handleScheduleAppointment}>
                      <Calendar size={16} className="mr-2" />
                      Schedule a Session
                    </Button>
                  </div>
                )}
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="w-full" onClick={handleScheduleAppointment}>
                    <Calendar size={16} className="mr-2" />
                    Book New Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Stay in touch with your nutritionist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/30 dark:bg-muted/10 p-8 text-center mb-4">
                  <p className="text-muted-foreground">No new messages</p>
                </div>
                <Button variant="outline" className="w-full" onClick={handleViewMessages}>
                  <MessageSquare size={16} className="mr-2" />
                  Send a Message
                </Button>
              </CardContent>
            </Card>
          </div>
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

export default ClientDashboard;
