import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  description?: string;
  date: string;
  status?: "completed" | "pending" | "in_progress";
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start space-x-4">
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2",
                item.status === "completed"
                  ? "bg-green-500 border-green-500"
                  : item.status === "in_progress"
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              )}
            >
              {item.status === "completed" && (
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1 pt-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h4>
              {item.description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


