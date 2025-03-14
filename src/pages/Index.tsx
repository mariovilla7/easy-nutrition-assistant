
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
  Gift, 
  Plus, 
  Utensils, 
  Users, 
  MessageSquare
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Welcome back</p>
                <h1 className="text-2xl font-semibold md:text-3xl">Dashboard</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Calendar size={16} className="mr-2" />
                  Schedule
                </Button>
                <Button size="sm">
                  <Plus size={16} className="mr-2" />
                  New Client
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Clients"
              value="128"
              icon={Users}
              trend={{ value: 12, label: "from last month", positive: true }}
              variant="glass"
            />
            <StatCard
              title="Active Meal Plans"
              value="87"
              icon={Utensils}
              trend={{ value: 8, label: "from last month", positive: true }}
              variant="glass"
            />
            <StatCard
              title="New Messages"
              value="34"
              icon={MessageSquare}
              trend={{ value: 5, label: "from yesterday", positive: true }}
              variant="glass"
            />
            <StatCard
              title="This Month's Revenue"
              value="$6,400"
              icon={Gift}
              trend={{ value: 3, label: "from last month", positive: false }}
              variant="primary"
            />
          </div>

          <div className="mt-6">
            <TabView
              tabs={[
                { id: "overview", label: "Overview" },
                { id: "performance", label: "Performance" },
                { id: "tasks", label: "Tasks" },
              ]}
              defaultTab="overview"
            >
              <TabView.Content tabId="overview">
                <div className="mt-6 grid gap-6 lg:grid-cols-5">
                  <div className="lg:col-span-2">
                    <ClientList />
                  </div>
                  <div className="lg:col-span-3">
                    <ActivityFeed />
                  </div>
                </div>

                <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-primary" />
                      <h3 className="font-medium">Upcoming Sessions</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Calendar
                    </Button>
                  </div>

                  <div className="rounded-lg border bg-muted/30 p-8 text-center">
                    <p className="text-muted-foreground">No upcoming sessions scheduled for today</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Calendar size={16} className="mr-2" />
                      Schedule a Session
                    </Button>
                  </div>
                </div>
              </TabView.Content>

              <TabView.Content tabId="performance">
                <div className="mt-6 rounded-xl border bg-white p-8 text-center shadow-sm">
                  <p className="text-muted-foreground">Performance metrics will be available soon</p>
                </div>
              </TabView.Content>

              <TabView.Content tabId="tasks">
                <div className="mt-6 rounded-xl border bg-white p-8 text-center shadow-sm">
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

export default Index;
