
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import IconButton from "@/components/common/IconButton";
import SearchInput from "@/components/common/SearchInput";
import { NavItem } from "./types";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[];
  isActive: (path: string) => boolean;
}

export const MobileMenu = ({ 
  isOpen, 
  setIsOpen, 
  navItems, 
  isActive 
}: MobileMenuProps) => {
  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <IconButton
          icon={LogOut}
          variant="ghost"
          size="sm"
          aria-label="Open menu"
        />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <div className="flex flex-col h-full py-4">
          <div className="flex items-center mb-6">
            <img 
              src="/lovable-uploads/b36875e3-2bbd-44f1-9dd7-0bd7f1f04ba7.png" 
              alt="KYA-ORA Logo" 
              className="h-8 mr-2" 
            />
            <span className="text-xl font-medium">KYA-ORA</span>
          </div>
          
          <div className="px-1 mb-4">
            <SearchInput placeholder="Search..." />
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/40 ${
                        isActive(item.path)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`}
                      onClick={closeSheet}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/300" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">jane@example.com</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  closeSheet();
                  // Implement logout functionality
                }}
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
