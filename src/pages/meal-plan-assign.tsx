
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Search, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock data for clients
const mockClients = [
  { id: "1", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=1", goal: "Weight Loss", lastActive: "2 days ago" },
  { id: "2", name: "John Davis", avatar: "https://i.pravatar.cc/150?img=2", goal: "Muscle Gain", lastActive: "5 days ago" },
  { id: "3", name: "Alice Johnson", avatar: "https://i.pravatar.cc/150?img=3", goal: "Balanced Diet", lastActive: "1 day ago" },
  { id: "4", name: "Robert Williams", avatar: "https://i.pravatar.cc/150?img=4", goal: "Weight Loss", lastActive: "Today" },
  { id: "5", name: "Emily Brown", avatar: "https://i.pravatar.cc/150?img=5", goal: "Muscle Gain", lastActive: "3 days ago" },
  { id: "6", name: "Michael Miller", avatar: "https://i.pravatar.cc/150?img=6", goal: "Balanced Diet", lastActive: "1 week ago" },
];

const MealPlanAssignPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());

  // Filter clients based on search term
  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.goal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    navigate(`/meal-plans/${id}`);
  };

  const handleToggleClient = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(client => client.id));
    }
  };

  const handleAssign = () => {
    if (selectedClients.length === 0) {
      toast({
        title: "No clients selected",
        description: "Please select at least one client to assign this meal plan",
        variant: "destructive",
      });
      return;
    }

    if (!startDate) {
      toast({
        title: "Start date required",
        description: "Please select a start date for the meal plan",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save the assignments to a database
    toast({
      title: "Meal plan assigned",
      description: `Successfully assigned to ${selectedClients.length} client${selectedClients.length > 1 ? 's' : ''}`,
    });
    navigate(`/meal-plans/${id}`);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Meal Plan
          </Button>
          
          <div className="mb-6">
            <h1 className="text-2xl font-semibold md:text-3xl">Assign Meal Plan</h1>
            <p className="text-sm text-muted-foreground">
              Select clients to assign the "{id === 'new' ? 'New Meal Plan' : id === 'ai-generated' ? 'AI Generated Plan' : 'Balanced Diet Plan'}" to
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search clients..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSelectAll}
                  className="ml-2"
                >
                  {selectedClients.length === filteredClients.length && filteredClients.length > 0
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              </div>

              <div className="border rounded-md">
                <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
                  <p className="font-medium text-sm">Clients ({filteredClients.length})</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedClients.length} selected
                  </p>
                </div>
                
                {filteredClients.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No clients found matching your search.</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredClients.map((client) => (
                      <div 
                        key={client.id} 
                        className={`flex items-center gap-3 p-4 transition-colors hover:bg-muted/40 ${
                          selectedClients.includes(client.id) ? "bg-muted/30" : ""
                        }`}
                      >
                        <Checkbox 
                          id={`client-${client.id}`}
                          checked={selectedClients.includes(client.id)}
                          onCheckedChange={() => handleToggleClient(client.id)}
                        />
                        <div className="flex flex-1 items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={client.avatar} />
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-xs text-muted-foreground">Goal: {client.goal}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">Active: {client.lastActive}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Assignment Details</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="start-date"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm mb-2">Selected Clients: {selectedClients.length}</p>
                      {selectedClients.length > 0 && (
                        <div className="max-h-[150px] overflow-y-auto space-y-2 pr-2">
                          {selectedClients.map(clientId => {
                            const client = mockClients.find(c => c.id === clientId);
                            return client ? (
                              <div key={clientId} className="flex items-center gap-2 text-sm">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={client.avatar} />
                                  <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{client.name}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>

                    <Button 
                      className="w-full mt-4" 
                      onClick={handleAssign}
                      disabled={selectedClients.length === 0 || !startDate}
                    >
                      <Check size={16} className="mr-2" />
                      Assign Meal Plan
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

export default MealPlanAssignPage;
