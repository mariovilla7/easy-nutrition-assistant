
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/common/IconButton";
import StatCard from "@/components/dashboard/StatCard";
import ClientList from "@/components/dashboard/ClientList";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import Navbar from "@/components/layout/Navbar";
import TabView from "@/components/common/TabView";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { 
  Calendar, 
  ChevronUp, 
  Clock, 
  CreditCard, 
  DollarSign,
  MessageSquare,
  Plus, 
  Utensils, 
  Users, 
  Wallet,
  Bell,
  Calendar as CalendarIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleNewClient = () => {
    navigate("/clients");
  };

  const handleViewCalendar = () => {
    navigate("/calendar");
  };

  const handleScheduleSession = () => {
    navigate("/calendar");
  };

  const handleViewMessages = () => {
    navigate("/messages");
  };

  const handleViewClients = () => {
    navigate("/clients");
  };

  const handleViewMealPlans = () => {
    navigate("/meal-plans");
  };

  // Mock payment schedules
  const paymentSchedules = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      amount: 120,
      dueDate: addDays(new Date(), 3),
      status: "Upcoming"
    },
    {
      id: 2,
      clientName: "Michael Chen",
      amount: 150,
      dueDate: addDays(new Date(), 7),
      status: "Upcoming"
    },
    {
      id: 3,
      clientName: "Jessica Park",
      amount: 120,
      dueDate: addDays(new Date(), -2),
      status: "Overdue"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/20 dark:bg-background">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Welcome back</p>
                <h1 className="text-2xl font-semibold md:text-3xl">Dashboard</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex" onClick={handleViewCalendar}>
                  <Calendar size={16} className="mr-2" />
                  Schedule
                </Button>
                <Button size="sm" onClick={handleNewClient}>
                  <Plus size={16} className="mr-2" />
                  New Client
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Clients"
              value="128"
              icon={Users}
              trend={{ value: 12, label: "from last month", positive: true }}
              variant="default"
              linkTo="/clients"
            />
            <StatCard
              title="Active Meal Plans"
              value="87"
              icon={Utensils}
              trend={{ value: 8, label: "from last month", positive: true }}
              variant="default"
              linkTo="/meal-plans"
            />
            <StatCard
              title="New Messages"
              value="34"
              icon={MessageSquare}
              trend={{ value: 5, label: "from yesterday", positive: true }}
              variant="default"
              linkTo="/messages"
            />
          </div>

          <div className="mt-6">
            <TabView
              tabs={[
                { id: "overview", label: "Overview" },
                { id: "finance", label: "Finance" },
                { id: "tasks", label: "Tasks" },
              ]}
              defaultTab="overview"
              onTabChange={setActiveTab}
            >
              <TabView.Content tabId="overview">
                <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-5">
                  <div className="lg:col-span-2">
                    <ClientList />
                  </div>
                  <div className="lg:col-span-3">
                    <ActivityFeed />
                  </div>
                </div>

                <div className="mt-6 rounded-xl border bg-card dark:bg-card/80 p-5 shadow-sm">
                  <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-primary" />
                      <h3 className="font-medium">Upcoming Sessions</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs" onClick={handleViewCalendar}>
                      View Calendar
                    </Button>
                  </div>

                  <div className="rounded-lg border bg-muted/30 dark:bg-muted/10 p-8 text-center">
                    <p className="text-muted-foreground">No upcoming sessions scheduled for today</p>
                    <Button variant="outline" size="sm" className="mt-3" onClick={handleScheduleSession}>
                      <Calendar size={16} className="mr-2" />
                      Schedule a Session
                    </Button>
                  </div>
                </div>
              </TabView.Content>

              <TabView.Content tabId="finance">
                <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-3">
                  <Card className="md:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Payment Actions</CardTitle>
                      <CardDescription>Manage client payments</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full flex items-center justify-start" variant="outline">
                        <CreditCard className="mr-2" size={18} />
                        Schedule New Payment
                      </Button>
                      <Button className="w-full flex items-center justify-start" variant="outline">
                        <Bell className="mr-2" size={18} />
                        Send Payment Reminder
                      </Button>
                      <Button className="w-full flex items-center justify-start" variant="outline">
                        <Wallet className="mr-2" size={18} />
                        View Payment History
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle className="text-lg">Payment Schedule</CardTitle>
                        <CardDescription>Upcoming client payments</CardDescription>
                      </div>
                      <Button size="sm">
                        <Plus size={16} className="mr-2" />
                        Add Payment
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-3">
                          {paymentSchedules.length > 0 ? (
                            paymentSchedules.map((payment) => (
                              <div key={payment.id} 
                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 dark:hover:bg-muted/10 transition-colors">
                                <div>
                                  <p className="font-medium">{payment.clientName}</p>
                                  <p className="text-sm text-muted-foreground">Due: {format(payment.dueDate, 'MMM dd, yyyy')}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <p className="font-medium">${payment.amount}</p>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    payment.status === "Upcoming" 
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" 
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  }`}>
                                    {payment.status}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="rounded-lg border bg-muted/30 dark:bg-muted/10 p-8 text-center">
                              <p className="text-muted-foreground">No payment schedules created yet</p>
                              <Button variant="outline" size="sm" className="mt-3">
                                <Plus size={16} className="mr-2" />
                                Create Payment Schedule
                              </Button>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">Client Billing Overview</CardTitle>
                      <CardDescription>Manage all your client payments</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-lg border p-4 bg-muted/30 dark:bg-muted/10">
                          <p className="text-muted-foreground text-sm">Upcoming Payments</p>
                          <p className="text-2xl font-semibold mt-1">$270.00</p>
                        </div>
                        <div className="rounded-lg border p-4 bg-muted/30 dark:bg-muted/10">
                          <p className="text-muted-foreground text-sm">Overdue Payments</p>
                          <p className="text-2xl font-semibold mt-1">$120.00</p>
                        </div>
                        <div className="rounded-lg border p-4 bg-muted/30 dark:bg-muted/10">
                          <p className="text-muted-foreground text-sm">Total This Month</p>
                          <p className="text-2xl font-semibold mt-1">$1,450.00</p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button onClick={() => navigate("/clients")}>
                          <Users size={16} className="mr-2" />
                          Manage Client Billing
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabView.Content>

              <TabView.Content tabId="tasks">
                <div className="mt-6 rounded-xl border bg-card dark:bg-card/80 p-8 text-center shadow-sm">
                  <p className="text-muted-foreground">Task management will be available soon</p>
                </div>
              </TabView.Content>
            </TabView>
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

export default Dashboard;
