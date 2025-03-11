
import { LucideIcon } from "lucide-react";

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
}
