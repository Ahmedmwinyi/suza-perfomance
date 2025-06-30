import type { ReactNode } from "react";
import { clsx } from "clsx";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "secondary",
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={clsx("inline-flex items-center rounded-full font-medium", {
        "px-2 py-1 text-xs": size === "sm",
        "px-3 py-1 text-sm": size === "md",
        "bg-blue-100 text-blue-800": variant === "primary",
        "bg-gray-100 text-gray-800": variant === "secondary",
        "bg-green-100 text-green-800": variant === "success",
        "bg-yellow-100 text-yellow-800": variant === "warning",
        "bg-red-100 text-red-800": variant === "error",
        "bg-indigo-100 text-indigo-800": variant === "info",
      })}
    >
      {children}
    </span>
  );
}
