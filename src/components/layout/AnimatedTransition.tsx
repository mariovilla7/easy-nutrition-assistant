
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const AnimatedTransition = ({
  children,
  className,
  direction = "up",
  duration = 0.3,
}: AnimatedTransitionProps) => {
  // Define animations based on direction
  const getAnimations = () => {
    const distance = 15;
    
    switch (direction) {
      case "up":
        return {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -distance },
        };
      case "down":
        return {
          initial: { opacity: 0, y: -distance },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: distance },
        };
      case "left":
        return {
          initial: { opacity: 0, x: distance },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -distance },
        };
      case "right":
        return {
          initial: { opacity: 0, x: -distance },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: distance },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  const animations = getAnimations();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn("w-full", className)}
        initial={animations.initial}
        animate={animations.animate}
        exit={animations.exit}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
