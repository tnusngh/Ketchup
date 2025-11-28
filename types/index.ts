export type UserRole = "employer" | "hr" | "employee" | "manager";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "exiting";
  managerId?: string;
  joinDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  assigneeId: string;
  assigneeName: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "sick" | "vacation" | "personal" | "other";
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
  submittedAt: string;
}

export interface LeaveBalance {
  employeeId: string;
  sick: number;
  vacation: number;
  personal: number;
  total: number;
}

export interface Recognition {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "award" | "achievement" | "milestone";
  title: string;
  description: string;
  issuedBy: string;
  issuedAt: string;
  credentialHash?: string;
}

export interface Document {
  id: string;
  employeeId: string;
  type: "kyc" | "education" | "offer" | "appraisal" | "compliance" | "other";
  name: string;
  status: "pending" | "verified" | "rejected";
  uploadedAt: string;
  hash?: string;
}

export interface Application {
  id: string;
  candidateName: string;
  email: string;
  position: string;
  status: "screened" | "shortlisted" | "rejected" | "selected";
  interviewStage: number;
  applicationDate: string;
  documentStatus: {
    kyc: "pending" | "verified" | "rejected";
    education: "pending" | "verified" | "rejected";
    jobDocs: "pending" | "verified" | "rejected";
  };
}

export interface ExitProcess {
  id: string;
  employeeId: string;
  employeeName: string;
  exitDate: string;
  fnfStatus: "pending" | "processing" | "completed";
  assetSubmission: "pending" | "completed";
  pendingDues: number;
  handoverStatus: "pending" | "completed";
  credentialIssued: boolean;
}

export interface WorkLog {
  id: string;
  employeeId: string;
  date: string;
  hoursWorked: number;
  tasksCompleted: number;
  notes: string;
}

export interface MonitoringMetrics {
  employeeId: string;
  employeeName: string;
  completedTasks: number;
  pendingTasks: number;
  timeSpent: number;
  qualityScore: number;
  redFlags: string[];
}

export interface Grievance {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "harassment" | "discrimination" | "workplace" | "other";
  description: string;
  status: "open" | "under_review" | "resolved" | "closed";
  filedAt: string;
  managerId?: string;
  reviewerId?: string;
}

export interface SalaryInfo {
  employeeId: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  currency: string;
  period: string;
}

export interface Comment {
  id: string;
  taskId: string;
  employeeId: string;
  employeeName: string;
  comment: string;
  createdAt: string;
}


