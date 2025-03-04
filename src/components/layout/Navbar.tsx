
import {
  Bell,
  Calendar,
  ChevronDown,
  Home,
  LogOut,
  MessageSquare,
  Moon,
  Settings,
  Sun,
  Users,
  Utensils
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IconButton from "../common/IconButton";
import SearchInput from "../common/SearchInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navItems = [
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
            <Utensils size={22} className="text-primary" />
            <span className="text-xl">Nutritime</span>
          </Link>
          
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/40 ${
                        isActive(item.path)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
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
            
            <IconButton
              icon={Bell}
              variant="ghost"
              size="sm"
              aria-label="Notifications"
            />

            <DropdownMenu>
              <DropdownMenuTrigger className="focus-ring rounded-full">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/300" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <ChevronDown size={16} className="text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium leading-none">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">jane@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings size={16} className="mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut size={16} className="mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
