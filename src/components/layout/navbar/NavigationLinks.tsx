
import { Link } from "react-router-dom";
import { NavItem } from "./types";

interface NavigationLinksProps {
  navItems: NavItem[];
  isActive: (path: string) => boolean;
}

export const NavigationLinks = ({ navItems, isActive }: NavigationLinksProps) => {
  return (
    <nav className="hidden md:flex">
      <ul className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/40 ${
                  isActive(item.path)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
