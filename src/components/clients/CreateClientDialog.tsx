
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type ClientFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  goal: string;
  dietaryRestrictions: string[];
  notes: string;
};

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Nut allergy",
  "Shellfish allergy",
  "Kosher",
  "Halal",
  "Low FODMAP",
  "Keto-friendly"
];

const CreateClientDialog = ({ 
  onClientCreated 
}: { 
  onClientCreated?: (client: any) => void 
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ClientFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    goal: "",
    dietaryRestrictions: [],
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => {
      const restrictions = prev.dietaryRestrictions.includes(value)
        ? prev.dietaryRestrictions.filter(item => item !== value)
        : [...prev.dietaryRestrictions, value];
      
      return {
        ...prev,
        dietaryRestrictions: restrictions
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send data to an API
    // For now, we'll just create a client object and pass it up
    const newClient = {
      id: Date.now(), // temporary ID
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      age: parseInt(formData.age) || null,
      goal: formData.goal,
      dietaryRestrictions: formData.dietaryRestrictions,
      notes: formData.notes,
      joinDate: new Date().toISOString()
    };

    if (onClientCreated) {
      onClientCreated(newClient);
    }

    toast({
      description: `Client ${formData.firstName} ${formData.lastName} created successfully!`,
    });

    // Reset form and close dialog
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      goal: "",
      dietaryRestrictions: [],
      notes: ""
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Create New Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Client</DialogTitle>
          <DialogDescription>
            Enter your client's information to create their profile.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Goal</Label>
                <Input 
                  id="goal" 
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  placeholder="Weight loss, muscle gain, balanced diet, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Dietary Restrictions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`restriction-${option}`}
                        checked={formData.dietaryRestrictions.includes(option)}
                        onCheckedChange={() => handleCheckboxChange(option)}
                      />
                      <Label htmlFor={`restriction-${option}`} className="cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information about the client..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button type="submit">Create Client</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientDialog;
