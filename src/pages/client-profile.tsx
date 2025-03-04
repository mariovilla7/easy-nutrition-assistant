
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileEdit, Trash2, Utensils, CalendarDays, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ClientProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, this would be fetched from an API
  const client = {
    id: parseInt(id || "0"),
    name: id === "1" ? "Jane Doe" : id === "2" ? "Alex Smith" : "Maria Kim",
    email: id === "1" ? "jane.doe@example.com" : id === "2" ? "alex.smith@example.com" : "maria.kim@example.com",
    phone: "555-123-4567",
    age: id === "1" ? 26 : id === "2" ? 32 : 29,
    goal: id === "1" ? "Weight Loss" : id === "2" ? "Muscle Gain" : "Balanced Diet",
    plan: id === "1" ? "Weight Loss Plan" : id === "2" ? "Muscle Gain Plan" : "Balanced Diet Plan",
    joinDate: id === "1" ? "Jan 2023" : id === "2" ? "Mar 2023" : "Nov 2022",
    metrics: {
      weight: id === "1" ? "142 lbs" : id === "2" ? "185 lbs" : "165 lbs",
      height: id === "1" ? "5'6\"" : id === "2" ? "6'0\"" : "5'8\"",
      bodyFat: id === "1" ? "24%" : id === "2" ? "18%" : "22%",
      bmi: id === "1" ? "22.9" : id === "2" ? "25.1" : "25.1"
    },
    dietaryRestrictions: id === "1" 
      ? ["Gluten-free", "Dairy-free"] 
      : id === "2" 
        ? ["None"] 
        : ["Vegetarian"],
    notes: "Client is motivated and consistent with their nutrition plan. Has shown steady progress."
  };

  const handleEditClient = () => {
    toast({
      description: "Edit client functionality coming soon",
    });
  };

  const handleDeleteClient = () => {
    toast({
      description: "Delete client functionality coming soon",
      variant: "destructive"
    });
  };

  const handleAssignMealPlan = () => {
    navigate(`/meal-plans/new/assign?clientId=${id}`);
  };

  const handleScheduleAppointment = () => {
    navigate(`/calendar?clientId=${id}`);
  };

  const handleSendMessage = () => {
    navigate(`/messages?clientId=${id}`);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <div className="mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4"
              onClick={() => navigate("/clients")}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Clients
            </Button>
            
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${client.id}`} />
                  <AvatarFallback>
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-semibold md:text-3xl">{client.name}</h1>
                  <p className="text-sm text-muted-foreground">Client since {client.joinDate}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleEditClient}
                >
                  <FileEdit size={16} className="mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDeleteClient}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="plans">Meal Plans</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">Contact Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">Email:</span>
                              <span>{client.email}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">Phone:</span>
                              <span>{client.phone}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Basic Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">Age:</span>
                              <span>{client.age}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">Goal:</span>
                              <span>{client.goal}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="text-muted-foreground">Current Plan:</span>
                              <span>{client.plan}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Dietary Restrictions</h3>
                        <div className="flex flex-wrap gap-2">
                          {client.dietaryRestrictions.map((restriction, index) => (
                            <span 
                              key={index} 
                              className="bg-muted text-xs rounded-full px-2 py-1"
                            >
                              {restriction}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Notes</h3>
                        <p className="text-sm">{client.notes}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="metrics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Weight</p>
                          <p className="text-lg font-medium">{client.metrics.weight}</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Height</p>
                          <p className="text-lg font-medium">{client.metrics.height}</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Body Fat</p>
                          <p className="text-lg font-medium">{client.metrics.bodyFat}</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">BMI</p>
                          <p className="text-lg font-medium">{client.metrics.bmi}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <p className="text-sm text-muted-foreground text-center">
                          Detailed metrics and progress tracking coming soon
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="plans">
                  <Card>
                    <CardHeader>
                      <CardTitle>Meal Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Current and past meal plans assigned to this client.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{client.plan}</h3>
                              <p className="text-sm text-muted-foreground">Assigned on: June 15, 2023</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/meal-plans/1`)}
                            >
                              View Plan
                            </Button>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleAssignMealPlan}
                          className="w-full"
                        >
                          <Utensils size={16} className="mr-2" />
                          Assign New Meal Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full" 
                    onClick={handleAssignMealPlan}
                  >
                    <Utensils size={16} className="mr-2" />
                    Assign Meal Plan
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleScheduleAppointment}
                  >
                    <CalendarDays size={16} className="mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleSendMessage}
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming appointments
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleScheduleAppointment}
                  >
                    <CalendarDays size={16} className="mr-2" />
                    Schedule Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default ClientProfilePage;
