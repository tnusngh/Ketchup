import { Avatar } from "@/components/atoms/Avatar";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import { WalletBadge } from "@/components/atoms/WalletBadge";
import { Employee } from "@/data/mockData";
import { Mail, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmployeeCardProps {
  employee: Employee;
  className?: string;
  onClick?: () => void;
}

export function EmployeeCard({ employee, className, onClick }: EmployeeCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5 shadow-card transition-all duration-200 hover:shadow-card-hover cursor-pointer animate-slide-up",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <Avatar initials={employee.avatar} size="lg" online={employee.status === 'active'} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{employee.name}</h3>
            <StatusBadge status={employee.status} />
          </div>
          <p className="text-sm text-primary font-medium mb-2">{employee.role}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate">{employee.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              <span>{employee.department}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <WalletBadge
          connected={employee.walletConnected}
          address={employee.walletAddress}
        />
      </div>
    </div>
  );
}
