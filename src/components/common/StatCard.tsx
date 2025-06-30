import { DivideIcon as LucideIcon } from "lucide-react";
import { Card } from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon: LucideIcon;
  color?: "blue" | "green" | "yellow" | "red" | "purple";
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color = "blue",
}: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-500 text-blue-500",
    green: "bg-green-500 text-green-500",
    yellow: "bg-yellow-500 text-yellow-500",
    red: "bg-red-500 text-red-500",
    purple: "bg-purple-500 text-purple-500",
  };

  return (
    <Card hover>
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p
              className={`text-sm mt-1 ${
                change.type === "increase" ? "text-green-600" : "text-red-600"
              }`}
            >
              {change.type === "increase" ? "+" : "-"}
              {Math.abs(change.value)}%
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center ${colorClasses[color]}`}
        >
          <Icon className={`w-6 h-6 ${colorClasses[color].split(" ")[1]}`} />
        </div>
      </div>
    </Card>
  );
}
