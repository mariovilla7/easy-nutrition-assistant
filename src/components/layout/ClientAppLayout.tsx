
import React from 'react';
import { useClientMode } from './navbar/UserProfileDropdown';
import Navbar from './Navbar';
import ClientNavbar from './ClientNavbar';

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
              const componentName = child.type.name;
              
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
