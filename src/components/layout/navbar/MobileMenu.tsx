
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
          icon={(props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>}
          variant="ghost"
          size="sm"
          aria-label="Open menu"
        />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <div className="flex flex-col h-full py-4">
          <div className="flex items-center mb-6">
            <img 
              src="/lovable-uploads/49b67077-b404-4160-98b3-498759f3855a.png" 
              alt="KYA-ORA Logo" 
              className="h-6 mr-2" 
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
