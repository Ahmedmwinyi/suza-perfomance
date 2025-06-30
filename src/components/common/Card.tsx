import type { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export function Card({
  children,
  className,
  padding = "md",
  hover = false,
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg border border-gray-200 shadow-sm",
        {
          "p-0": padding === "none",
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
          "hover:shadow-md transition-shadow": hover,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
