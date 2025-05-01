
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Create context for client mode
export const ClientModeContext = createContext({
  clientMode: false,
  setClientMode: (value: boolean) => {}
});

export const useClientMode = () => useContext(ClientModeContext);

export const ClientModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientMode, setClientMode] = useState(false);
  
  return (
    <ClientModeContext.Provider value={{ clientMode, setClientMode }}>
      {children}
    </ClientModeContext.Provider>
  );
};

export const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clientMode, setClientMode] = useState(false);
  
  const handleToggleMode = () => {
    setClientMode(!clientMode);
    toast({
      description: `Switched to ${!clientMode ? 'Client' : 'Professional'} view`,
    });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-ring rounded-full hidden md:flex">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/300" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} className="text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium leading-none">Jane Doe</p>
          <p className="text-xs text-muted-foreground">jane@example.com</p>
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span className="text-sm">Client Mode</span>
          </div>
          <Switch 
            checked={clientMode}
            onCheckedChange={handleToggleMode}
            aria-label="Toggle client mode"
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Settings size={16} className="mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut size={16} className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
