import { cn } from "@/lib/utils";

type StatusType = 
  | 'active' | 'inactive' | 'pending' | 'approved' | 'rejected'
  | 'completed' | 'in-progress' | 'todo' | 'review'
  | 'verified' | 'processing' | 'onboarding' | 'exiting'
  | 'screened' | 'shortlisted' | 'interview' | 'selected'
  | 'low' | 'medium' | 'high' | 'urgent';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground border-muted' },
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning border-warning/20' },
  approved: { label: 'Approved', className: 'bg-success/10 text-success border-success/20' },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success border-success/20' },
  'in-progress': { label: 'In Progress', className: 'bg-primary/10 text-primary border-primary/20' },
  todo: { label: 'To Do', className: 'bg-muted text-muted-foreground border-muted' },
  review: { label: 'In Review', className: 'bg-accent/10 text-accent border-accent/20' },
  verified: { label: 'Verified', className: 'bg-success/10 text-success border-success/20' },
  processing: { label: 'Processing', className: 'bg-primary/10 text-primary border-primary/20' },
  onboarding: { label: 'Onboarding', className: 'bg-primary/10 text-primary border-primary/20' },
  exiting: { label: 'Exiting', className: 'bg-accent/10 text-accent border-accent/20' },
  screened: { label: 'Screened', className: 'bg-muted text-muted-foreground border-muted' },
  shortlisted: { label: 'Shortlisted', className: 'bg-primary/10 text-primary border-primary/20' },
  interview: { label: 'Interview', className: 'bg-warning/10 text-warning border-warning/20' },
  selected: { label: 'Selected', className: 'bg-success/10 text-success border-success/20' },
  low: { label: 'Low', className: 'bg-muted text-muted-foreground border-muted' },
  medium: { label: 'Medium', className: 'bg-warning/10 text-warning border-warning/20' },
  high: { label: 'High', className: 'bg-accent/10 text-accent border-accent/20' },
  urgent: { label: 'Urgent', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: 'bg-muted text-muted-foreground' };
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
