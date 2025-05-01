
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronUp, Clock, Video } from "lucide-react";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IconButton from "@/components/common/IconButton";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, isSameDay, startOfMonth } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ClientAppointments = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  
  // Mock data for appointments
  const appointments = [
    {
      id: 1,
      title: "Nutrition Consultation",
      date: addDays(new Date(), 2),
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      nutritionist: "Dr. Sarah Johnson",
      type: "video",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Progress Review",
      date: addDays(new Date(), 7),
      startTime: "2:30 PM",
      endTime: "3:15 PM",
      nutritionist: "Dr. Sarah Johnson",
      type: "video",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Initial Consultation",
      date: addDays(new Date(), -14),
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      nutritionist: "Dr. Sarah Johnson",
      type: "in-person",
      status: "completed"
    }
  ];

  // Available time slots
  const availableTimeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM"
  ];

  // Appointment types
  const appointmentTypes = [
    "Initial Consultation",
    "Progress Review",
    "Meal Plan Review",
    "Nutrition Consultation"
  ];

  // Filter appointments for the selected date
  const appointmentsOnSelectedDate = appointments.filter(appointment => 
    isSameDay(appointment.date, date)
  );

  const upcomingAppointments = appointments.filter(
    appointment => appointment.status === "upcoming"
  );

  const pastAppointments = appointments.filter(
    appointment => appointment.status === "completed"
  ).slice(0, 5); // Show only last 5 completed appointments

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleViewAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseAppointmentView = () => {
    setSelectedAppointment(null);
  };

  const handleBookAppointment = () => {
    setShowBookDialog(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedTime || !selectedType) {
      toast({
        title: "Missing information",
        description: "Please select both a time and appointment type",
        variant: "destructive"
      });
      return;
    }
    
    setShowBookDialog(false);
    toast({
      description: `Appointment request sent for ${format(date, 'MMMM d, yyyy')} at ${selectedTime}`,
    });
    
    // Reset form
    setSelectedTime("");
    setSelectedType("");
  };

  const handleJoinCall = () => {
    toast({
      description: "Joining video call..."
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">My Appointments</h1>
                <p className="text-sm text-muted-foreground">Schedule and manage your sessions</p>
              </div>
              <div>
                <Button onClick={handleBookAppointment}>
                  Book Appointment
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mb-4"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date, "MMMM d, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="mt-4 space-y-2">
                  {appointmentsOnSelectedDate.length > 0 ? (
                    appointmentsOnSelectedDate.map(appointment => (
                      <div
                        key={appointment.id}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-accent/10"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appointment.title}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock size={12} />
                              <span>{appointment.startTime} - {appointment.endTime}</span>
                            </div>
                          </div>
                          <Badge variant={appointment.status === "upcoming" ? "default" : "outline"}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-6">
                      No appointments scheduled for this date
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map(appointment => (
                      <div
                        key={appointment.id}
                        className="p-4 border rounded-lg hover:bg-accent/10 cursor-pointer"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{appointment.title}</h3>
                              <Badge>{appointment.type === "video" ? "Video" : "In-Person"}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {format(appointment.date, "EEEE, MMMM d, yyyy")}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock size={14} />
                              <span>{appointment.startTime} - {appointment.endTime}</span>
                            </div>
                            <p className="text-sm">With {appointment.nutritionist}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            {appointment.type === "video" && (
                              <Button size="sm" onClick={handleJoinCall}>
                                <Video size={16} className="mr-2" />
                                Join Call
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-4">No upcoming appointments scheduled</p>
                    <Button onClick={handleBookAppointment}>Book Your First Appointment</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Past Appointments</CardTitle>
              <CardDescription>Review your previous sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {pastAppointments.length > 0 ? (
                <div className="space-y-4">
                  {pastAppointments.map(appointment => (
                    <div
                      key={appointment.id}
                      className="p-4 border rounded-lg hover:bg-accent/10 cursor-pointer"
                      onClick={() => handleViewAppointment(appointment)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{appointment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {format(appointment.date, "MMMM d, yyyy")} • {appointment.startTime} - {appointment.endTime}
                          </p>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-6">
                  No past appointments found
                </p>
              )}
            </CardContent>
          </Card>
        </AnimatedTransition>
      </main>

      <Dialog open={selectedAppointment !== null} onOpenChange={handleCloseAppointmentView}>
        {selectedAppointment && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedAppointment.title}</DialogTitle>
              <DialogDescription>
                Appointment details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{format(selectedAppointment.date, "MMMM d, yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p>{selectedAppointment.startTime} - {selectedAppointment.endTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="capitalize">{selectedAppointment.type}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Nutritionist</p>
                <p>{selectedAppointment.nutritionist}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="mt-1" variant={selectedAppointment.status === "upcoming" ? "default" : "outline"}>
                  {selectedAppointment.status}
                </Badge>
              </div>
            </div>
            <DialogFooter className="flex sm:justify-between">
              {selectedAppointment.status === "upcoming" && (
                <>
                  <Button variant="destructive" size="sm">
                    Cancel Appointment
                  </Button>
                  {selectedAppointment.type === "video" && (
                    <Button size="sm" onClick={handleJoinCall}>
                      <Video size={16} className="mr-2" />
                      Join Video Call
                    </Button>
                  )}
                </>
              )}
              {selectedAppointment.status === "completed" && (
                <Button variant="outline" size="sm">
                  Request Notes
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
            <DialogDescription>
              Select a date, time and appointment type
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="appointment-date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="appointment-date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "MMMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appointment-time">Available Times</Label>
              <Select
                value={selectedTime}
                onValueChange={setSelectedTime}
              >
                <SelectTrigger id="appointment-time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appointment-type">Appointment Type</Label>
              <Select
                value={selectedType}
                onValueChange={setSelectedType}
              >
                <SelectTrigger id="appointment-type">
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking}>
              Request Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

export default ClientAppointments;
