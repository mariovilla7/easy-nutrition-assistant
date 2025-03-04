
import React from "react";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CalendarPage = () => {
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  
  // Dummy events for the demo
  const events = [
    { 
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      title: "Jane Doe - Initial Consultation",
      time: "10:00 AM - 11:00 AM"
    },
    { 
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      title: "Alex Smith - Progress Review",
      time: "2:30 PM - 3:15 PM"
    },
    { 
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      title: "Maria Kim - Meal Plan Adjustment",
      time: "11:30 AM - 12:15 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/20">
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
                <Button size="sm">
                  <Plus size={16} className="mr-2" />
                  New Appointment
                </Button>
              </div>
            </div>
          </header>

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} className="text-primary" />
              <h2 className="text-xl font-medium">{currentMonth} {currentYear}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" size="sm">
                Today
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-7 border-b">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="border-r p-3 text-center text-sm font-medium last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid h-[600px] grid-cols-7">
                  {Array.from({ length: 35 }).map((_, idx) => {
                    const isToday = idx === 15; // Arbitrary position for today
                    const hasEvent = [16, 18, 20].includes(idx); // Positions with events
                    
                    return (
                      <div 
                        key={idx}
                        className={`min-h-[120px] border-b border-r p-1 last:border-r-0 
                          ${isToday ? "bg-primary/5" : ""}`}
                      >
                        <div className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs
                          ${isToday ? "bg-primary text-primary-foreground" : ""}`}>
                          {((idx % 31) + 1)}
                        </div>
                        
                        {hasEvent && (
                          <div className="mt-1 cursor-pointer rounded bg-primary/10 p-1 text-xs hover:bg-primary/20">
                            <p className="font-medium text-primary">
                              {idx === 16 ? "10:00 Jane Doe" : idx === 18 ? "14:30 Alex Smith" : "11:30 Maria Kim"}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CalendarPage;
