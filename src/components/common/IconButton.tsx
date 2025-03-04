
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  size?: "sm" | "md" | "lg";
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, variant = "default", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors focus-ring",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "text-primary underline-offset-4 hover:underline": variant === "link",
            "h-8 w-8": size === "sm",
            "h-10 w-10": size === "md",
            "h-12 w-12": size === "lg",
          },
          className
        )}
        {...props}
      >
        <Icon
          size={size === "sm" ? 16 : size === "md" ? 18 : 20}
          className="animate-in zoom-in duration-300"
        />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
