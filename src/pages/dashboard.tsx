
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
  Gift, 
  Plus, 
  Utensils, 
  Users, 
  Wallet,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  // Mock financial data
  const financialData = [
    { id: 1, client: "Sarah Johnson", date: "Yesterday", amount: 120, status: "Paid" },
    { id: 2, client: "Michael Chen", date: "Sep 15, 2023", amount: 150, status: "Paid" },
    { id: 3, client: "Jessica Park", date: "Sep 14, 2023", amount: 120, status: "Pending" },
    { id: 4, client: "David Rodriguez", date: "Sep 10, 2023", amount: 200, status: "Paid" },
    { id: 5, client: "Emma Wilson", date: "Sep 5, 2023", amount: 180, status: "Overdue" },
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

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
            <StatCard
              title="Monthly Revenue"
              value="$6,400"
              icon={DollarSign}
              trend={{ value: 3, label: "from last month", positive: false }}
              variant="primary"
              linkTo="#finance"
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
                        Schedule Payment
                      </Button>
                      <Button className="w-full flex items-center justify-start" variant="outline">
                        <DollarSign className="mr-2" size={18} />
                        Record Manual Payment
                      </Button>
                      <Button className="w-full flex items-center justify-start" variant="outline">
                        <Wallet className="mr-2" size={18} />
                        View Payment History
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Transactions</CardTitle>
                      <CardDescription>Your latest payment activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-3">
                          {financialData.map((transaction) => (
                            <div key={transaction.id} 
                              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 dark:hover:bg-muted/10 transition-colors">
                              <div>
                                <p className="font-medium">{transaction.client}</p>
                                <p className="text-sm text-muted-foreground">{transaction.date}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <p className="font-medium">${transaction.amount}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  transaction.status === "Paid" 
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                                    : transaction.status === "Pending" 
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                }`}>
                                  {transaction.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Schedule</CardTitle>
                    <CardDescription>Upcoming client payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border bg-muted/30 dark:bg-muted/10 p-8 text-center">
                      <p className="text-muted-foreground">No payment schedules created yet</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        <Plus size={16} className="mr-2" />
                        Create Payment Schedule
                      </Button>
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
