import { StatusBadge } from "@/components/atoms/StatusBadge";
import { ProgressRing } from "@/components/atoms/ProgressRing";
import { Task } from "@/data/mockData";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  className?: string;
  onClick?: () => void;
}

export function TaskCard({ task, className, onClick }: TaskCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5 shadow-card transition-all duration-200 hover:shadow-card-hover cursor-pointer animate-slide-up",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={task.priority} />
            <StatusBadge status={task.status} />
          </div>
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{task.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{task.dueDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{task.timeSpent}h logged</span>
            </div>
          </div>
        </div>
        {task.qualityScore && (
          <ProgressRing
            value={task.qualityScore}
            size={56}
            color={task.qualityScore >= 90 ? 'success' : task.qualityScore >= 70 ? 'primary' : 'warning'}
          />
        )}
      </div>
    </div>
  );
}
