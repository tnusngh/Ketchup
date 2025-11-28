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
import { OnboardingApplication } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { FileCheck, GraduationCap, Shield } from "lucide-react";

interface OnboardingTableProps {
  applications: OnboardingApplication[];
  className?: string;
}

export function OnboardingTable({ applications, className }: OnboardingTableProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden shadow-card", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Applicant</TableHead>
            <TableHead className="font-semibold">Position</TableHead>
            <TableHead className="font-semibold">Stage</TableHead>
            <TableHead className="font-semibold">Verification</TableHead>
            <TableHead className="font-semibold">Applied</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow
              key={app.id}
              className="cursor-pointer transition-colors hover:bg-muted/50"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar initials={getInitials(app.applicantName)} size="sm" />
                  <div>
                    <p className="font-medium text-foreground">{app.applicantName}</p>
                    <p className="text-xs text-muted-foreground">{app.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm font-medium">{app.position}</p>
                  <p className="text-xs text-muted-foreground">{app.department}</p>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={app.stage} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1" title="KYC">
                    <Shield className={cn(
                      "h-4 w-4",
                      app.kycStatus === 'verified' ? 'text-success' : 
                      app.kycStatus === 'rejected' ? 'text-destructive' : 'text-muted-foreground'
                    )} />
                  </div>
                  <div className="flex items-center gap-1" title="Education">
                    <GraduationCap className={cn(
                      "h-4 w-4",
                      app.educationStatus === 'verified' ? 'text-success' : 
                      app.educationStatus === 'rejected' ? 'text-destructive' : 'text-muted-foreground'
                    )} />
                  </div>
                  <div className="flex items-center gap-1" title="Documents">
                    <FileCheck className={cn(
                      "h-4 w-4",
                      app.documentsStatus === 'complete' ? 'text-success' : 
                      app.documentsStatus === 'incomplete' ? 'text-warning' : 'text-muted-foreground'
                    )} />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {app.applicationDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
