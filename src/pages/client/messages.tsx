
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, PaperclipIcon, SendHorizontal, SmileIcon } from "lucide-react";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IconButton from "@/components/common/IconButton";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

const ClientMessages = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState("");
  const [activeContact, setActiveContact] = useState<string>("1");
  
  // Mock data for contacts/nutritionists
  const contacts = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Lead Nutritionist",
      avatar: "https://i.pravatar.cc/150?img=1",
      online: true,
      lastMessage: "Let me know if you have any questions about your new meal plan.",
      lastActivity: new Date(),
      unread: 0
    },
    {
      id: "2",
      name: "Michael Roberts",
      role: "Support Specialist",
      avatar: "https://i.pravatar.cc/150?img=8",
      online: false,
      lastMessage: "Your payment was received. Thank you!",
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      unread: 2
    }
  ];
  
  // Mock data for messages
  const messageHistory = [
    {
      id: "1",
      contactId: "1",
      messages: [
        {
          id: "1-1",
          sender: "contact",
          text: "Hello Jane, welcome to KYA-ORA! I'm Dr. Sarah Johnson and I'll be your nutritionist.",
          timestamp: new Date(Date.now() - 172800000), // 2 days ago
          read: true
        },
        {
          id: "1-2",
          sender: "user",
          text: "Hi Dr. Johnson! I'm excited to get started on my nutrition journey.",
          timestamp: new Date(Date.now() - 172700000),
          read: true
        },
        {
          id: "1-3",
          sender: "contact",
          text: "That's great! I've prepared an initial meal plan based on the information you provided. Take a look and let me know if you have any questions or need adjustments.",
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
          read: true
        },
        {
          id: "1-4",
          sender: "contact",
          text: "Also, I've scheduled an initial consultation for us on Friday at 10 AM. Does that work for you?",
          timestamp: new Date(Date.now() - 86300000),
          read: true
        },
        {
          id: "1-5",
          sender: "user",
          text: "The meal plan looks good! I might need some alternatives for lunch on weekdays though, since I only have 30 minutes for lunch at work.",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          read: true
        },
        {
          id: "1-6",
          sender: "user",
          text: "And yes, Friday at 10 AM works perfectly for me. Looking forward to it!",
          timestamp: new Date(Date.now() - 3500000),
          read: true
        },
        {
          id: "1-7",
          sender: "contact",
          text: "Perfect! I'll prepare some quick lunch alternatives for you. See you on Friday!",
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
          read: true
        }
      ]
    },
    {
      id: "2",
      contactId: "2",
      messages: [
        {
          id: "2-1",
          sender: "contact",
          text: "Hello Jane, I'm Michael from customer support. I wanted to confirm that we've received your payment for this month's nutrition plan.",
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
          read: true
        },
        {
          id: "2-2",
          sender: "contact",
          text: "Your payment was received. Thank you!",
          timestamp: new Date(Date.now() - 43200000), // 12 hours ago
          read: false
        },
        {
          id: "2-3",
          sender: "contact",
          text: "If you have any billing questions, feel free to ask!",
          timestamp: new Date(Date.now() - 43100000),
          read: false
        }
      ]
    }
  ];

  const activeChat = messageHistory.find(history => history.contactId === activeContact);
  const activeContactData = contacts.find(contact => contact.id === activeContact);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    toast({
      description: "Message sent successfully",
    });

    // Clear the input field
    setMessageText("");
  };

  const handleContactClick = (contactId: string) => {
    setActiveContact(contactId);
  };

  const handleAttachment = () => {
    toast({
      description: "Attachment feature coming soon",
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Messages</h1>
                <p className="text-sm text-muted-foreground">Communicate with your nutritionist and support staff</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contacts List */}
            <Card className="md:col-span-1">
              <CardContent className="p-3">
                <div className="space-y-1">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                        activeContact === contact.id 
                          ? "bg-accent text-accent-foreground" 
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleContactClick(contact.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>
                            {contact.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-medium truncate">{contact.name}</p>
                          <span className="text-xs text-muted-foreground">
                            {format(contact.lastActivity, "h:mm a")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground truncate">
                            {contact.lastMessage}
                          </p>
                          {contact.unread > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="md:col-span-2">
              {activeContactData && (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 p-4 border-b">
                    <Avatar>
                      <AvatarImage src={activeContactData.avatar} alt={activeContactData.name} />
                      <AvatarFallback>
                        {activeContactData.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{activeContactData.name}</p>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${activeContactData.online ? 'bg-green-500' : 'bg-muted'}`} />
                        <p className="text-xs text-muted-foreground">
                          {activeContactData.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {activeChat?.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                              {format(message.timestamp, "h:mm a")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={handleAttachment}
                      >
                        <PaperclipIcon className="h-5 w-5" />
                      </Button>
                      <Input
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toast({ description: "Emoji picker coming soon" })}
                      >
                        <SmileIcon className="h-5 w-5" />
                      </Button>
                      <Button 
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                      >
                        <SendHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        </AnimatedTransition>
      </main>

      <div className="fixed bottom-4 right-4">
        <IconButton
          icon={ChevronUp}
          size="lg"
          className="shadow-md"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        />
      </div>
    </div>
  );
};

export default ClientMessages;
