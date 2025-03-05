
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AnimatedTransition from "@/components/layout/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { PenSquare, Search, Send, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const MessagesPage = () => {
  const { toast } = useToast();
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [messageText, setMessageText] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  // Mock clients for message creation
  const clients = [
    { id: "1", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: "2", name: "Alex Smith", avatar: "https://i.pravatar.cc/100?img=2" },
    { id: "3", name: "Maria Kim", avatar: "https://i.pravatar.cc/100?img=3" },
    { id: "4", name: "John Miller", avatar: "https://i.pravatar.cc/100?img=4" },
    { id: "5", name: "Sarah Wilson", avatar: "https://i.pravatar.cc/100?img=5" }
  ];

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      // In a real app, you would send the message to the server
      setCurrentMessage("");
      toast({
        description: "Message sent",
      });
    }
  };

  const handleCreateNewMessage = () => {
    setShowNewMessageDialog(true);
  };

  const handleSubmitNewMessage = () => {
    if (selectedClient && messageText.trim()) {
      setShowNewMessageDialog(false);
      toast({
        title: "Message Created",
        description: "Your message has been sent to the client",
      });
      setSelectedClient("");
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container px-4 pb-12 pt-6 md:px-6">
        <AnimatedTransition>
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Messages</h1>
                <p className="text-sm text-muted-foreground">Communicate with your clients</p>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={handleCreateNewMessage}>
                  <PenSquare size={16} className="mr-2" />
                  New Message
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-8" 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                {[
                  { name: "Jane Doe", message: "Thanks for the new meal plan!", unread: true, time: "10:23 AM", avatar: "https://i.pravatar.cc/100?img=1" },
                  { name: "Alex Smith", message: "When is our next appointment?", unread: true, time: "Yesterday", avatar: "https://i.pravatar.cc/100?img=2" },
                  { name: "Maria Kim", message: "I've been following the plan for a week now", unread: false, time: "Yesterday", avatar: "https://i.pravatar.cc/100?img=3" },
                  { name: "John Miller", message: "Can we adjust the protein intake?", unread: false, time: "Monday", avatar: "https://i.pravatar.cc/100?img=4" },
                  { name: "Sarah Wilson", message: "Just sent you my latest metrics", unread: false, time: "Jan 21", avatar: "https://i.pravatar.cc/100?img=5" }
                ].map((chat, idx) => (
                  <div 
                    key={idx}
                    className={`cursor-pointer rounded-lg border p-3 transition-colors hover:bg-accent/50 
                      ${idx === 0 ? "border-primary/30 bg-primary/5" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${chat.unread ? "text-foreground" : "text-muted-foreground"}`}>
                            {chat.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{chat.time}</p>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {chat.message}
                        </p>
                      </div>
                      {chat.unread && <Badge className="h-2 w-2 rounded-full p-0" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 border-b pb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://i.pravatar.cc/100?img=1" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-xs text-muted-foreground">Online • Last seen 10 minutes ago</p>
                  </div>
                </div>
                
                <div className="my-4 flex flex-col gap-3">
                  <div className="flex justify-center">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">Today</span>
                  </div>
                  
                  <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-none bg-primary p-3 text-primary-foreground">
                    <p className="text-sm">Hi Jane, I've prepared a new meal plan based on your latest feedback. Please check it and let me know what you think!</p>
                    <p className="mt-1 text-right text-xs text-primary-foreground/70">10:15 AM</p>
                  </div>
                  
                  <div className="mr-auto max-w-[80%] rounded-lg rounded-tl-none bg-muted p-3">
                    <p className="text-sm">Thanks for the new meal plan! I really appreciate how you included more vegetarian options.</p>
                    <p className="mt-1 text-right text-xs text-muted-foreground">10:23 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1" 
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send size={16} className="mr-2" />
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Message</DialogTitle>
                <DialogDescription>
                  Start a new conversation with a client
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="client">Recipient</Label>
                  <Select 
                    value={selectedClient}
                    onValueChange={setSelectedClient}
                  >
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={client.avatar} />
                              <AvatarFallback>{client.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            {client.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Type your message here..." 
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitNewMessage}>
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default MessagesPage;
