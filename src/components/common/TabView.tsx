
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TabViewProps {
  tabs: { id: string; label: string }[];
  children: React.ReactNode;
  defaultTab?: string;
  className?: string;
  onTabChange?: (tabId: string) => void;
}

const TabView = ({ tabs, children, defaultTab, className, onTabChange }: TabViewProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  // Filter children to show only the active tab content
  const activeContent = Array.isArray(children)
    ? children.find((child) => (child as any).props.tabId === activeTab)
    : (children as any).props.tabId === activeTab
    ? children
    : null;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4 flex space-x-1 rounded-lg bg-muted/50 p-1 dark:bg-muted/20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-ring",
              activeTab === tab.id
                ? "bg-white text-foreground shadow-sm dark:bg-muted dark:text-white"
                : "text-muted-foreground hover:bg-white/50 hover:text-foreground dark:hover:bg-muted/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="animate-in fade-in duration-300">{activeContent}</div>
    </div>
  );
};

interface TabContentProps {
  tabId: string;
  children: React.ReactNode;
  className?: string;
}

const TabContent = ({ children, className }: TabContentProps) => {
  return <div className={cn("w-full", className)}>{children}</div>;
};

TabView.Content = TabContent;

export default TabView;
