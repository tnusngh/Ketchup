import { Recognition } from "@/data/mockData";
import { Award, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecognitionCardProps {
  recognition: Recognition;
  className?: string;
}

export function RecognitionCard({ recognition, className }: RecognitionCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5 shadow-card transition-all duration-200 hover:shadow-card-hover animate-slide-up",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-2xl">
          {recognition.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{recognition.title}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {recognition.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" />
              <span>by {recognition.awardedBy}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{recognition.awardedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
