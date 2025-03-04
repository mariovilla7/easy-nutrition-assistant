
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ClientsPage from "./pages/clients";
import ClientProfilePage from "./pages/client-profile";
import MealPlansPage from "./pages/meal-plans";
import MealPlanDetailsPage from "./pages/meal-plan-details";
import MealPlanAssignPage from "./pages/meal-plan-assign";
import CalendarPage from "./pages/calendar";
import MessagesPage from "./pages/messages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" closeButton={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:id" element={<ClientProfilePage />} />
          <Route path="/meal-plans" element={<MealPlansPage />} />
          <Route path="/meal-plans/:id" element={<MealPlanDetailsPage />} />
          <Route path="/meal-plans/:id/assign" element={<MealPlanAssignPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
