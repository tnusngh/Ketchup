import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  online?: boolean;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

export function Avatar({ initials, size = 'md', className, online }: AvatarProps) {
  return (
    <div className="relative inline-block">
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold",
          sizeClasses[size],
          className
        )}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-card",
            online ? "bg-success" : "bg-muted-foreground",
            size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-2.5 w-2.5' : 'h-3 w-3'
          )}
        />
      )}
    </div>
  );
}
