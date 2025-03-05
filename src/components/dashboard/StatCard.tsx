
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const cardVariants = cva(
  "relative overflow-hidden rounded-xl p-6 shadow-sm transition-all hover:shadow-md cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-card border dark:border-border/20",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "bg-transparent border",
        glass: "glassmorphism dark:bg-card/80 dark:backdrop-blur-md dark:border-border/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "outline" | "glass";
  className?: string;
  linkTo?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  className,
  linkTo,
}: StatCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (linkTo) {
      navigate(linkTo);
    }
  };

  return (
    <Card 
      className={cn(cardVariants({ variant }), className, 
        "hover:scale-[1.02] transition-all duration-200", 
        linkTo && "cursor-pointer"
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={cn("text-sm font-medium", {
                "text-muted-foreground": variant === "default" || variant === "outline" || variant === "glass",
              })}
            >
              {title}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{value}</h3>
            {trend && (
              <p
                className={cn("mt-1 flex items-center text-xs", {
                  "text-green-600 dark:text-green-400": trend.positive && (variant === "default" || variant === "outline" || variant === "glass"),
                  "text-red-600 dark:text-red-400": !trend.positive && (variant === "default" || variant === "outline" || variant === "glass"),
                  "text-primary-foreground/90": variant === "primary",
                  "text-secondary-foreground/90": variant === "secondary",
                })}
              >
                <span
                  className={cn("mr-1 rounded-sm px-1 py-0.5", {
                    "bg-green-100 dark:bg-green-900/30": trend.positive && (variant === "default" || variant === "outline" || variant === "glass"),
                    "bg-red-100 dark:bg-red-900/30": !trend.positive && (variant === "default" || variant === "outline" || variant === "glass"),
                    "bg-primary-foreground/20": variant === "primary",
                    "bg-secondary-foreground/20": variant === "secondary",
                  })}
                >
                  {trend.positive ? "+" : "-"}
                  {Math.abs(trend.value)}%
                </span>
                {trend.label}
              </p>
            )}
          </div>
          <div
            className={cn("rounded-full p-3", {
              "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground": variant === "default" || variant === "outline" || variant === "glass",
              "bg-primary-foreground/10 text-primary-foreground": variant === "primary",
              "bg-secondary-foreground/10 text-secondary-foreground": variant === "secondary",
            })}
          >
            <Icon size={22} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
