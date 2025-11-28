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
import { Task, employees } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface TaskTableProps {
  tasks: Task[];
  className?: string;
}

export function TaskTable({ tasks, className }: TaskTableProps) {
  const getAssignee = (assigneeId: string) => {
    return employees.find((e) => e.id === assigneeId);
  };

  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden shadow-card", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Task</TableHead>
            <TableHead className="font-semibold">Assignee</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Priority</TableHead>
            <TableHead className="font-semibold">Due Date</TableHead>
            <TableHead className="font-semibold text-right">Quality</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            const assignee = getAssignee(task.assignee);
            return (
              <TableRow
                key={task.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.id}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {assignee && (
                    <div className="flex items-center gap-2">
                      <Avatar initials={assignee.avatar} size="sm" />
                      <span className="text-sm">{assignee.name}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={task.priority} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {task.dueDate}
                </TableCell>
                <TableCell className="text-right">
                  {task.qualityScore ? (
                    <span
                      className={cn(
                        "font-semibold",
                        task.qualityScore >= 90
                          ? "text-success"
                          : task.qualityScore >= 70
                          ? "text-primary"
                          : "text-warning"
                      )}
                    >
                      {task.qualityScore}%
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
