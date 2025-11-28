import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/ui/button";
import { LeaveRequest, employees } from "@/data/mockData";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaveTableProps {
  leaves: LeaveRequest[];
  showActions?: boolean;
  className?: string;
}

export function LeaveTable({ leaves, showActions = false, className }: LeaveTableProps) {
  const getEmployee = (employeeId: string) => {
    return employees.find((e) => e.id === employeeId);
  };

  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden shadow-card", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Employee</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Duration</TableHead>
            <TableHead className="font-semibold">Reason</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            {showActions && <TableHead className="font-semibold text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave) => {
            const employee = getEmployee(leave.employeeId);
            return (
              <TableRow key={leave.id} className="transition-colors hover:bg-muted/50">
                <TableCell>
                  {employee && (
                    <div className="flex items-center gap-2">
                      <Avatar initials={employee.avatar} size="sm" />
                      <span className="text-sm font-medium">{employee.name}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{leave.type}</span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{leave.startDate}</p>
                    <p className="text-muted-foreground">to {leave.endDate}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{leave.reason}</span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={leave.status} />
                </TableCell>
                {showActions && leave.status === 'pending' && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="success" className="h-8">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="h-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
                {showActions && leave.status !== 'pending' && (
                  <TableCell className="text-right">
                    <span className="text-sm text-muted-foreground">—</span>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
