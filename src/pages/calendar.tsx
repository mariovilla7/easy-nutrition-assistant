
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  User,
  X
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isSameDay, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock clients for the demo
const mockClients = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Michael Chen" },
  { id: "3", name: "Jessica Park" },
  { id: "4", name: "David Rodriguez" },
  { id: "5", name: "Emma Wilson" },
  { id: "6", name: "Marcus Lee" }
];

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [sessionDetails, setSessionDetails] = useState({
    clientId: "",
    title: "",
    date: new Date(),
    time: "10:00",
    duration: "30"
  });
  
  // Dummy events for the demo
  const [events, setEvents] = useState([
    { 
      id: 1,
      date: addDays(new Date(), 1),
      title: "Jane Doe - Initial Consultation",
      time: "10:00 AM - 11:00 AM",
      client: "Jane Doe",
      type: "consultation"
    },
    { 
      id: 2,
      date: addDays(new Date(), 3),
      title: "Alex Smith - Progress Review",
      time: "2:30 PM - 3:15 PM",
      client: "Alex Smith",
      type: "review"
    },
    { 
      id: 3,
      date: addDays(new Date(), 5),
      title: "Maria Kim - Meal Plan Adjustment",
      time: "11:30 AM - 12:15 PM",
      client: "Maria Kim",
      type: "adjustment"
    },
    { 
      id: 4,
      date: addDays(new Date(), 2),
      title: "John Davis - Follow-up Session",
      time: "9:00 AM - 9:45 AM",
      client: "John Davis",
      type: "follow-up"
    }
  ]);

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const eventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const navigateToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setWeekStart(startOfWeek(today, { weekStartsOn: 0 }));
  };

  const navigateWeek = (direction: 'next' | 'prev') => {
    setWeekStart(prevWeekStart => 
      direction === 'next' 
        ? addWeeks(prevWeekStart, 1) 
        : subWeeks(prevWeekStart, 1)
    );
  };

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'consultation': return 'border-l-primary';
      case 'review': return 'border-l-secondary';
      case 'adjustment': return 'border-l-accent';
      case 'follow-up': return 'border-l-purple-500';
      default: return 'border-l-gray-400';
    }
  };

  const handleCreateSession = () => {
    setShowSessionDialog(true);
    setSessionDetails({
      ...sessionDetails,
      date: selectedDate
    });
  };

  const handleSaveSession = () => {
    if (!sessionDetails.clientId) return;
    
    const client = mockClients.find(c => c.id === sessionDetails.clientId);
    if (!client) return;
    
    // Create time string (simple for demo)
    const timeFormatted = `${sessionDetails.time} - ${getEndTime(sessionDetails.time, parseInt(sessionDetails.duration))}`;
    
    // Create new event
    const newEvent = {
      id: events.length + 1,
      date: sessionDetails.date,
      title: sessionDetails.title || `${client.name} - Nutrition Session`,
      time: timeFormatted,
      client: client.name,
      type: "consultation"
    };
    
    setEvents([...events, newEvent]);
    setShowSessionDialog(false);
  };

  const getEndTime = (startTime: string, durationMinutes: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    let endHours = hours + Math.floor((minutes + durationMinutes) / 60);
    const endMinutes = (minutes + durationMinutes) % 60;
    const period = endHours >= 12 ? 'PM' : 'AM';
    
    if (endHours > 12) endHours -= 12;
    if (endHours === 0) endHours = 12;
    
    return `${endHours}:${endMinutes.toString().padStart(2, '0')} ${period}`;
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  return (
    <div className="min-h-screen bg-muted/20 dark:bg-background">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Calendar</h1>
                <p className="text-sm text-muted-foreground">Manage your schedule and appointments</p>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={handleCreateSession}>
                  <Plus size={16} className="mr-2" />
                  New Appointment
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-[300px_1fr]">
            <div>
              <Card>
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                  
                  <div className="mt-6 space-y-2">
                    <h3 className="text-sm font-medium">Upcoming Events</h3>
                    {events.slice(0, 3).map(event => (
                      <div key={event.id} className="text-xs p-2 rounded-md border bg-muted/30 dark:bg-muted/10">
                        <p className="font-semibold">{format(event.date, 'MMM dd')} - {event.time}</p>
                        <p>{event.title}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={18} className="text-primary" />
                  <h2 className="text-xl font-medium">
                    {format(weekStart, "MMMM d")} - {format(addDays(weekStart, 6), "MMMM d, yyyy")}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={navigateToToday}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Days header */}
                  <div className="grid grid-cols-7 border-b">
                    {daysOfWeek.map((day, idx) => {
                      const isToday = isSameDay(day, new Date());
                      return (
                        <div 
                          key={idx} 
                          className={`border-r p-3 text-center last:border-r-0 ${
                            isToday ? 'bg-primary/10 font-medium' : ''
                          }`}
                        >
                          <p className="text-sm font-medium">
                            {format(day, "EEE")}
                          </p>
                          <p className={`text-lg mt-1 ${isToday ? 'text-primary font-bold' : ''}`}>
                            {format(day, "d")}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Schedule grid */}
                  <div className="relative">
                    {/* Time labels */}
                    <div className="absolute top-0 left-0 w-16 h-full border-r">
                      {hours.map((hour) => (
                        <div key={hour} className="h-20 border-b px-2 text-right">
                          <span className="text-xs text-muted-foreground">
                            {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Schedule content */}
                    <div className="ml-16 overflow-auto">
                      <div className="grid grid-cols-7 relative">
                        {/* Hour lines */}
                        {hours.map((hour) => (
                          <div key={hour} className="col-span-7 h-20 border-b grid grid-cols-7">
                            {Array.from({ length: 7 }).map((_, dayIdx) => (
                              <div key={dayIdx} className="border-r last:border-r-0"></div>
                            ))}
                          </div>
                        ))}
                        
                        {/* Events */}
                        {daysOfWeek.map((day, dayIdx) => {
                          const dayEvents = eventsForDate(day);
                          return dayEvents.map((event) => {
                            // Calculate position based on time (simplified)
                            const hours = parseInt(event.time.split(':')[0]);
                            const minutes = parseInt(event.time.split(':')[1]);
                            const top = (hours - 8) * 80 + (minutes / 60) * 80;
                            const height = 70; // fixed height for simplicity
                            
                            return (
                              <div 
                                key={event.id}
                                className={`absolute rounded-md p-2 bg-white dark:bg-muted border ${getEventTypeColor(event.type)} border-l-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
                                style={{ 
                                  top: `${top}px`, 
                                  height: `${height}px`,
                                  left: `calc(${dayIdx / 7 * 100}% + 16px)`, 
                                  width: `calc(${1/7 * 100}% - 8px)`,
                                }}
                              >
                                <p className="text-xs font-medium truncate">{event.time}</p>
                                <p className="text-xs truncate">{event.client}</p>
                              </div>
                            );
                          });
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedTransition>
      </main>

      {/* Session Creation Dialog */}
      <Dialog open={showSessionDialog} onOpenChange={setShowSessionDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Session</DialogTitle>
            <DialogDescription>
              Schedule a session with a client
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">
                Client
              </Label>
              <div className="col-span-3">
                <Select 
                  value={sessionDetails.clientId} 
                  onValueChange={(value) => setSessionDetails({...sessionDetails, clientId: value})}
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map(client => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={sessionDetails.title}
                placeholder="Session title (optional)"
                className="col-span-3"
                onChange={(e) => setSessionDetails({...sessionDetails, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  {format(sessionDetails.date, 'MMMM dd, yyyy')}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={sessionDetails.time}
                className="col-span-3"
                onChange={(e) => setSessionDetails({...sessionDetails, time: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Select 
                value={sessionDetails.duration} 
                onValueChange={(value) => setSessionDetails({...sessionDetails, duration: value})}
              >
                <SelectTrigger id="duration" className="col-span-3">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveSession} disabled={!sessionDetails.clientId}>Create Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
