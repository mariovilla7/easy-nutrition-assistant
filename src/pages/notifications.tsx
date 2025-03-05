
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, Check, Mail, Calendar, ListChecks, Utensils, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TabView from "@/components/common/TabView";

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: 'message',
    title: 'New message from Jane Smith',
    content: 'Hi, I had a question about my meal plan...',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    link: '/messages'
  },
  {
    id: 2,
    type: 'appointment',
    title: 'Upcoming appointment',
    content: 'Session with Michael Johnson tomorrow at 2:00 PM',
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    link: '/calendar'
  },
  {
    id: 3,
    type: 'plan',
    title: 'Meal plan updated',
    content: 'Weight Loss Plan has been updated successfully',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    link: '/meal-plans/2'
  },
  {
    id: 4,
    type: 'task',
    title: 'Task completed',
    content: 'Client assessment for David Lee has been completed',
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    link: '/clients/3'
  },
  {
    id: 5,
    type: 'payment',
    title: 'Payment received',
    content: 'Payment of $120.00 received from Sarah Williams',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    link: '/clients/2'
  },
  {
    id: 6,
    type: 'message',
    title: 'New message from Robert Davis',
    content: 'Thank you for the new program, I...',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    link: '/messages'
  },
  {
    id: 7,
    type: 'plan',
    title: 'Shopping list generated',
    content: 'New shopping list available for Muscle Gain Plan',
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    link: '/meal-plans/3/shopping-list'
  }
];

const NotificationsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const getUnreadCount = (type?: string) => {
    return notifications.filter(n => !n.isRead && (!type || n.type === type)).length;
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast({
      description: "All notifications marked as read",
    });
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleNavigate = (notification: typeof notifications[0]) => {
    handleMarkAsRead(notification.id);
    navigate(notification.link);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    } else if (diffMinutes < 60 * 24) {
      return `${Math.floor(diffMinutes / 60)} hr ago`;
    } else {
      return `${Math.floor(diffMinutes / (60 * 24))} day ago`;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'plan':
        return <Utensils className="h-5 w-5 text-green-500" />;
      case 'task':
        return <ListChecks className="h-5 w-5 text-amber-500" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-emerald-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Notifications</h1>
                <p className="text-sm text-muted-foreground">Keep track of important updates</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleMarkAllRead} disabled={getUnreadCount() === 0}>
                <Check size={16} className="mr-2" />
                Mark all as read
              </Button>
            </div>
          </header>

          <TabView 
            tabs={[
              { id: 'all', label: `All (${notifications.length})` },
              { id: 'unread', label: `Unread (${getUnreadCount()})` },
              { id: 'messages', label: `Messages (${notifications.filter(n => n.type === 'message').length})` },
              { id: 'plans', label: `Meal Plans (${notifications.filter(n => n.type === 'plan').length})` },
            ]}
            defaultTab="all"
            className="mb-6"
          >
            <TabView.Content tabId="all">
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`}
                      onClick={() => handleNavigate(notification)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/50">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className={`text-base font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">{notification.content}</p>
                              </div>
                              <div className="ml-4 flex flex-col items-end">
                                <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                                {!notification.isRead && (
                                  <Badge variant="default" className="mt-1">New</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No notifications</h3>
                    <p className="mt-1 text-sm text-muted-foreground">When you get notifications, they'll appear here</p>
                  </div>
                )}
              </div>
            </TabView.Content>
            
            <TabView.Content tabId="unread">
              <div className="space-y-4">
                {notifications.filter(n => !n.isRead).length > 0 ? (
                  notifications.filter(n => !n.isRead).map((notification) => (
                    <Card 
                      key={notification.id} 
                      className="cursor-pointer border-l-4 border-l-primary transition-colors hover:bg-muted/50"
                      onClick={() => handleNavigate(notification)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/50">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-base font-medium">{notification.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{notification.content}</p>
                              </div>
                              <div className="ml-4 flex flex-col items-end">
                                <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                                <Badge variant="default" className="mt-1">New</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Check className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">All caught up!</h3>
                    <p className="mt-1 text-sm text-muted-foreground">You have no unread notifications</p>
                  </div>
                )}
              </div>
            </TabView.Content>
            
            <TabView.Content tabId="messages">
              <div className="space-y-4">
                {notifications.filter(n => n.type === 'message').length > 0 ? (
                  notifications.filter(n => n.type === 'message').map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`}
                      onClick={() => handleNavigate(notification)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/50">
                            <Mail className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className={`text-base font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">{notification.content}</p>
                              </div>
                              <div className="ml-4 flex flex-col items-end">
                                <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                                {!notification.isRead && (
                                  <Badge variant="default" className="mt-1">New</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Mail className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No message notifications</h3>
                    <p className="mt-1 text-sm text-muted-foreground">When you receive messages, notifications will appear here</p>
                  </div>
                )}
              </div>
            </TabView.Content>
            
            <TabView.Content tabId="plans">
              <div className="space-y-4">
                {notifications.filter(n => n.type === 'plan').length > 0 ? (
                  notifications.filter(n => n.type === 'plan').map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`}
                      onClick={() => handleNavigate(notification)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/50">
                            <Utensils className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className={`text-base font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">{notification.content}</p>
                              </div>
                              <div className="ml-4 flex flex-col items-end">
                                <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                                {!notification.isRead && (
                                  <Badge variant="default" className="mt-1">New</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Utensils className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No meal plan notifications</h3>
                    <p className="mt-1 text-sm text-muted-foreground">When there are updates to meal plans, they'll appear here</p>
                  </div>
                )}
              </div>
            </TabView.Content>
          </TabView>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default NotificationsPage;
