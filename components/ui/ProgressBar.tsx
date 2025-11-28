import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  className,
  showLabel = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>{label || "Progress"}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}


