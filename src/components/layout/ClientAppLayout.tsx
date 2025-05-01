
import React from 'react';
import { useClientMode } from './navbar/UserProfileDropdown';
import Navbar from './Navbar';
import ClientNavbar from './ClientNavbar';
import ClientDashboard from '@/pages/client/dashboard';
import ClientMealPlans from '@/pages/client/meal-plans';
import ClientAppointments from '@/pages/client/appointments';
import ClientMessages from '@/pages/client/messages';

interface ClientAppLayoutProps {
  children: React.ReactNode;
}

const ClientAppLayout: React.FC<ClientAppLayoutProps> = ({ children }) => {
  const { clientMode } = useClientMode();
  
  return (
    <>
      {clientMode ? <ClientNavbar /> : <Navbar />}
      {clientMode ? (
        <div className="client-view">
          {React.Children.map(children, child => {
            // Check if the child is a valid React element
            if (React.isValidElement(child)) {
              // For each child component, check if there's a client equivalent
              const componentType = child.type;
              const componentName = typeof componentType !== 'string' ? 
                (componentType.displayName || componentType.name) : '';
              
              switch (componentName) {
                case 'Dashboard':
                  return <ClientDashboard />;
                case 'MealPlansPage':
                  return <ClientMealPlans />;
                case 'CalendarPage':
                  return <ClientAppointments />;
                case 'MessagesPage':
                  return <ClientMessages />;
                default:
                  return child; // Return the original component if no client equivalent
              }
            }
            return child;
          })}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ClientAppLayout;
