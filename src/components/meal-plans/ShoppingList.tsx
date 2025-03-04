
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Check, Download, ShoppingCart, Printer, RefreshCw } from "lucide-react";

interface ShoppingListProps {
  mealPlanId: string;
}

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  checked: boolean;
}

// Predefined grocery categories for organization
const categories = ["Fruits & Vegetables", "Meat & Fish", "Dairy & Eggs", "Grains & Bread", "Pantry Items", "Other"];

// Mock shopping list data - in a real app, this would be generated from the meal plan
const mockShoppingList: GroceryItem[] = [
  { id: "1", name: "Apples", category: "Fruits & Vegetables", quantity: "5", checked: false },
  { id: "2", name: "Spinach", category: "Fruits & Vegetables", quantity: "1 bag", checked: false },
  { id: "3", name: "Chicken breast", category: "Meat & Fish", quantity: "500g", checked: false },
  { id: "4", name: "Salmon fillet", category: "Meat & Fish", quantity: "2", checked: false },
  { id: "5", name: "Greek yogurt", category: "Dairy & Eggs", quantity: "1 tub", checked: false },
  { id: "6", name: "Eggs", category: "Dairy & Eggs", quantity: "12", checked: false },
  { id: "7", name: "Brown rice", category: "Grains & Bread", quantity: "1 bag", checked: false },
  { id: "8", name: "Quinoa", category: "Grains & Bread", quantity: "250g", checked: false },
  { id: "9", name: "Olive oil", category: "Pantry Items", quantity: "1 bottle", checked: false },
  { id: "10", name: "Almonds", category: "Pantry Items", quantity: "100g", checked: false },
];

const ShoppingList: React.FC<ShoppingListProps> = ({ mealPlanId }) => {
  const { toast } = useToast();
  const [items, setItems] = useState<GroceryItem[]>(mockShoppingList);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemCategory, setNewItemCategory] = useState(categories[0]);

  const handleCheckItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItemName.trim()) {
      toast({
        title: "Item name required",
        variant: "destructive",
      });
      return;
    }
    
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: newItemQuantity,
      category: newItemCategory,
      checked: false
    };
    
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemQuantity("");
    
    toast({
      description: `${newItemName} added to shopping list`,
    });
  };

  const handlePrint = () => {
    toast({
      description: "Preparing shopping list for printing...",
    });
    // In a real app, this would trigger print functionality
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleDownload = () => {
    toast({
      description: "Downloading shopping list as PDF...",
    });
    // In a real app, this would generate and download a PDF
  };

  const handleRegenerateList = () => {
    toast({
      description: "Regenerating shopping list based on meal plan...",
    });
    // In a real app, this would recalculate the shopping list from the meal plan
  };

  // Group items by category for display
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold flex items-center">
          <ShoppingCart size={20} className="mr-2" />
          Shopping List
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleRegenerateList}>
            <RefreshCw size={14} className="mr-1" />
            Regenerate
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer size={14} className="mr-1" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download size={14} className="mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddItem} className="flex flex-wrap gap-3">
            <div className="w-full md:w-[calc(50%-0.375rem)]">
              <Label htmlFor="item-name">Item Name</Label>
              <Input
                id="item-name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="e.g., Apples"
                className="mt-1"
              />
            </div>
            <div className="w-full md:w-[calc(25%-0.375rem)]">
              <Label htmlFor="item-quantity">Quantity</Label>
              <Input
                id="item-quantity"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                placeholder="e.g., 5"
                className="mt-1"
              />
            </div>
            <div className="w-full md:w-[calc(25%-0.375rem)]">
              <Label htmlFor="item-category">Category</Label>
              <select
                id="item-category"
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="w-full flex justify-end">
              <Button type="submit" size="sm">
                <Plus size={16} className="mr-2" />
                Add Item
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
        <Card key={category} className="overflow-hidden">
          <CardHeader className="bg-muted/50 py-3">
            <CardTitle className="text-md">{category}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {categoryItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-6 py-3">
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={item.checked}
                    onCheckedChange={() => handleCheckItem(item.id)}
                  />
                  <Label
                    htmlFor={`item-${item.id}`}
                    className={`flex-1 cursor-pointer ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {item.name}
                  </Label>
                  <span className="text-sm text-muted-foreground">{item.quantity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      <div className="mt-6 flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {items.filter(item => item.checked).length} of {items.length} items checked
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setItems(items.map(item => ({ ...item, checked: false })))}
          disabled={!items.some(item => item.checked)}
        >
          <Check size={14} className="mr-1" />
          Uncheck All
        </Button>
      </div>
    </div>
  );
};

export default ShoppingList;
