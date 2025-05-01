
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ClientModeProvider } from "@/components/layout/navbar/UserProfileDropdown";
import Dashboard from "./pages/dashboard";
import ClientsPage from "./pages/clients";
import ClientProfilePage from "./pages/client-profile";
import MealPlansPage from "./pages/meal-plans";
import MealPlanDetailsPage from "./pages/meal-plan-details";
import MealPlanAssignPage from "./pages/meal-plan-assign";
import CalendarPage from "./pages/calendar";
import MessagesPage from "./pages/messages";
import NotificationsPage from "./pages/notifications";
import NotFound from "./pages/NotFound";
import CreateMenuPage from "./pages/create-menu";
import ClientDashboard from "./pages/client/dashboard";
import ClientMealPlans from "./pages/client/meal-plans";
import ClientAppointments from "./pages/client/appointments";
import ClientMessages from "./pages/client/messages";
import ClientAppLayout from "./components/layout/ClientAppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <ClientModeProvider>
          <Toaster />
          <Sonner position="top-right" closeButton theme="system" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ClientAppLayout><Dashboard /></ClientAppLayout>} />
              <Route path="/clients" element={<ClientAppLayout><ClientsPage /></ClientAppLayout>} />
              <Route path="/clients/:id" element={<ClientAppLayout><ClientProfilePage /></ClientAppLayout>} />
              <Route path="/meal-plans" element={<ClientAppLayout><MealPlansPage /></ClientAppLayout>} />
              <Route path="/meal-plans/:id" element={<ClientAppLayout><MealPlanDetailsPage /></ClientAppLayout>} />
              <Route path="/meal-plans/:id/assign" element={<ClientAppLayout><MealPlanAssignPage /></ClientAppLayout>} />
              <Route path="/meal-plans/create" element={<ClientAppLayout><CreateMenuPage /></ClientAppLayout>} />
              <Route path="/calendar" element={<ClientAppLayout><CalendarPage /></ClientAppLayout>} />
              <Route path="/messages" element={<ClientAppLayout><MessagesPage /></ClientAppLayout>} />
              <Route path="/notifications" element={<ClientAppLayout><NotificationsPage /></ClientAppLayout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ClientModeProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
