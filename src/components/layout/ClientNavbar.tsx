
import {
  Calendar,
  Home,
  Menu,
  MessageSquare,
  Moon,
  Sun,
  Utensils,
  User
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IconButton from "../common/IconButton";
import SearchInput from "../common/SearchInput";
import { useTheme } from "./ThemeProvider";
import { NotificationsPopover } from "./navbar/NotificationsPopover";
import { UserProfileDropdown } from "./navbar/UserProfileDropdown";
import { MobileMenu } from "./navbar/MobileMenu";
import { NavItem } from "./navbar/types";

const ClientNavbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navItems: NavItem[] = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/meal-plans", label: "My Meal Plans", icon: Utensils },
    { path: "/calendar", label: "Appointments", icon: Calendar },
    { path: "/messages", label: "Messages", icon: MessageSquare },
    { path: "/profile", label: "My Profile", icon: User },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur transition-all">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 lg:gap-10">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img 
              src="/lovable-uploads/b36875e3-2bbd-44f1-9dd7-0bd7f1f04ba7.png" 
              alt="KYA-ORA Logo" 
              className="h-8" 
            />
            <span className="text-xl">KYA-ORA</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted ${
                  isActive(item.path) ? "bg-muted" : ""
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <SearchInput placeholder="Search..." />
          </div>

          <div className="flex items-center gap-1">
            <IconButton
              icon={theme === "light" ? Moon : Sun}
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            />
            
            <NotificationsPopover 
              notifications={[]}
              setNotifications={() => {}}
              unreadCount={0}
              setUnreadCount={() => {}}
            />
            
            <IconButton
              icon={Menu}
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden"
              aria-label="Open menu"
            />

            <UserProfileDropdown />
          </div>
        </div>
      </div>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navItems={navItems}
        isActive={isActive}
      />
    </header>
  );
};

export default ClientNavbar;
