
import {
  Calendar,
  Home,
  Menu,
  MessageSquare,
  Moon,
  Sun,
  Users,
  Utensils
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IconButton from "../common/IconButton";
import SearchInput from "../common/SearchInput";
import { useTheme } from "./ThemeProvider";
import { NavigationLinks } from "./navbar/NavigationLinks";
import { NotificationsPopover } from "./navbar/NotificationsPopover";
import { UserProfileDropdown } from "./navbar/UserProfileDropdown";
import { MobileMenu } from "./navbar/MobileMenu";
import { NavItem, Notification } from "./navbar/types";

// Mock notification data
const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New client request",
    description: "Sarah Johnson has requested to become a client",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Message received",
    description: "Michael Chen: Can we reschedule tomorrow's appointment?",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Payment received",
    description: "Jessica Park has completed their payment",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "Reminder",
    description: "You have a consultation with David Rodriguez tomorrow at 2PM",
    time: "5 hours ago",
    read: true,
  },
];

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState(initialNotifications);
  const [unreadNotifications, setUnreadNotifications] = useState(
    initialNotifications.filter(n => !n.read).length
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navItems: NavItem[] = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/clients", label: "Clients", icon: Users },
    { path: "/meal-plans", label: "Meal Plans", icon: Utensils },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/messages", label: "Messages", icon: MessageSquare },
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
          
          <NavigationLinks navItems={navItems} isActive={isActive} />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden w-64 md:block">
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
              notifications={notificationsList}
              setNotifications={setNotificationsList}
              unreadCount={unreadNotifications}
              setUnreadCount={setUnreadNotifications}
            />
            
            <MobileMenu 
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
              navItems={navItems}
              isActive={isActive}
            />

            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
