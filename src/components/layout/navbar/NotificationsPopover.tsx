
import { Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import IconButton from "@/components/common/IconButton";

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

interface NotificationsPopoverProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

export const NotificationsPopover = ({
  notifications,
  setNotifications,
  unreadCount,
  setUnreadCount
}: NotificationsPopoverProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    toast({
      description: "All notifications marked as read",
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <IconButton
            icon={Bell}
            variant="ghost"
            size="sm"
            aria-label="Notifications"
          />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-medium">Notifications</h3>
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="divide-y">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 hover:bg-muted/50 dark:hover:bg-muted/10 transition-colors ${
                  !notification.read ? 'bg-muted/20 dark:bg-muted/5' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  {!notification.read && (
                    <Badge variant="outline" className="h-1.5 w-1.5 rounded-full p-0 bg-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => {
              setIsOpen(false);
              navigate("/notifications");
            }}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
