import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

const statusColors: Record<string, string> = {
  // Task statuses
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  
  // Leave statuses
  approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  
  // Employee statuses
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  exiting: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  
  // Application statuses
  screened: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  shortlisted: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  selected: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  
  // Document statuses
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  
  // Exit process
  processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  
  // Grievance
  open: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  under_review: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  
  // Priority
  low: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  
  // Grievance types
  harassment: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  discrimination: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  workplace: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
};

export function StatusBadge({ status, label, size = "md", className }: StatusBadgeProps) {
  const colorClass =
    statusColors[status.toLowerCase()] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-0.5 text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        sizeClass,
        colorClass,
        className
      )}
    >
      {label || status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
    </span>
  );
}


