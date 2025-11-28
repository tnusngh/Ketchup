import {
  Employee,
  Task,
  LeaveRequest,
  LeaveBalance,
  Recognition,
  Document,
  Application,
  ExitProcess,
  WorkLog,
  MonitoringMetrics,
  Grievance,
  SalaryInfo,
  Comment,
} from "@/types";

export const mockEmployees: Employee[] = [
  {
    id: "emp1",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "active",
    managerId: "mgr1",
    joinDate: "2023-01-15",
  },
  {
    id: "emp2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Product Manager",
    department: "Product",
    status: "active",
    managerId: "mgr1",
    joinDate: "2023-03-20",
  },
  {
    id: "emp3",
    name: "Bob Johnson",
    email: "bob.johnson@company.com",
    role: "Designer",
    department: "Design",
    status: "exiting",
    managerId: "mgr2",
    joinDate: "2022-06-10",
  },
];

export const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Implement user authentication",
    description: "Add OAuth2 integration",
    status: "completed",
    assigneeId: "emp1",
    assigneeName: "John Doe",
    dueDate: "2024-01-20",
    priority: "high",
    createdAt: "2024-01-10",
  },
  {
    id: "task2",
    title: "Design dashboard UI",
    description: "Create mockups for new dashboard",
    status: "in_progress",
    assigneeId: "emp2",
    assigneeName: "Jane Smith",
    dueDate: "2024-01-25",
    priority: "medium",
    createdAt: "2024-01-12",
  },
  {
    id: "task3",
    title: "Fix bug in payment module",
    description: "Resolve issue with payment processing",
    status: "pending",
    assigneeId: "emp1",
    assigneeName: "John Doe",
    dueDate: "2024-01-22",
    priority: "high",
    createdAt: "2024-01-15",
  },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "leave1",
    employeeId: "emp1",
    employeeName: "John Doe",
    type: "vacation",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    status: "pending",
    reason: "Family vacation",
    submittedAt: "2024-01-18",
  },
  {
    id: "leave2",
    employeeId: "emp2",
    employeeName: "Jane Smith",
    type: "sick",
    startDate: "2024-01-20",
    endDate: "2024-01-21",
    status: "approved",
    reason: "Medical appointment",
    submittedAt: "2024-01-19",
  },
];

export const mockLeaveBalances: LeaveBalance[] = [
  {
    employeeId: "emp1",
    sick: 8,
    vacation: 12,
    personal: 3,
    total: 23,
  },
  {
    employeeId: "emp2",
    sick: 10,
    vacation: 15,
    personal: 5,
    total: 30,
  },
];

export const mockRecognitions: Recognition[] = [
  {
    id: "rec1",
    employeeId: "emp1",
    employeeName: "John Doe",
    type: "award",
    title: "Employee of the Month",
    description: "Outstanding performance in Q4",
    issuedBy: "CEO",
    issuedAt: "2024-01-01",
    credentialHash: "0x1234...",
  },
  {
    id: "rec2",
    employeeId: "emp2",
    employeeName: "Jane Smith",
    type: "achievement",
    title: "Project Excellence",
    description: "Successfully launched new product",
    issuedBy: "CTO",
    issuedAt: "2023-12-15",
  },
];

export const mockDocuments: Document[] = [
  {
    id: "doc1",
    employeeId: "emp1",
    type: "kyc",
    name: "Identity Proof",
    status: "verified",
    uploadedAt: "2023-01-10",
    hash: "0xabcd...",
  },
  {
    id: "doc2",
    employeeId: "emp1",
    type: "education",
    name: "Degree Certificate",
    status: "verified",
    uploadedAt: "2023-01-12",
  },
  {
    id: "doc3",
    employeeId: "emp1",
    type: "appraisal",
    name: "Annual Review 2023",
    status: "pending",
    uploadedAt: "2024-01-15",
  },
];

export const mockApplications: Application[] = [
  {
    id: "app1",
    candidateName: "Alice Brown",
    email: "alice.brown@email.com",
    position: "Senior Developer",
    status: "shortlisted",
    interviewStage: 2,
    applicationDate: "2024-01-10",
    documentStatus: {
      kyc: "verified",
      education: "verified",
      jobDocs: "pending",
    },
  },
  {
    id: "app2",
    candidateName: "Charlie Wilson",
    email: "charlie.wilson@email.com",
    position: "UX Designer",
    status: "screened",
    interviewStage: 1,
    applicationDate: "2024-01-12",
    documentStatus: {
      kyc: "pending",
      education: "verified",
      jobDocs: "pending",
    },
  },
];

export const mockExitProcesses: ExitProcess[] = [
  {
    id: "exit1",
    employeeId: "emp3",
    employeeName: "Bob Johnson",
    exitDate: "2024-02-15",
    fnfStatus: "processing",
    assetSubmission: "pending",
    pendingDues: 5000,
    handoverStatus: "pending",
    credentialIssued: false,
  },
];

export const mockWorkLogs: WorkLog[] = [
  {
    id: "log1",
    employeeId: "emp1",
    date: "2024-01-18",
    hoursWorked: 8,
    tasksCompleted: 3,
    notes: "Completed authentication module",
  },
  {
    id: "log2",
    employeeId: "emp1",
    date: "2024-01-17",
    hoursWorked: 7.5,
    tasksCompleted: 2,
    notes: "Code review and bug fixes",
  },
];

export const mockMonitoringMetrics: MonitoringMetrics[] = [
  {
    employeeId: "emp1",
    employeeName: "John Doe",
    completedTasks: 45,
    pendingTasks: 5,
    timeSpent: 320,
    qualityScore: 92,
    redFlags: [],
  },
  {
    employeeId: "emp2",
    employeeName: "Jane Smith",
    completedTasks: 38,
    pendingTasks: 8,
    timeSpent: 280,
    qualityScore: 88,
    redFlags: ["Multiple missed deadlines"],
  },
];

export const mockGrievances: Grievance[] = [
  {
    id: "griev1",
    employeeId: "emp1",
    employeeName: "John Doe",
    type: "workplace",
    description: "Unfair workload distribution",
    status: "under_review",
    filedAt: "2024-01-15",
    managerId: "mgr1",
    reviewerId: "hr1",
  },
];

export const mockSalaryInfo: SalaryInfo[] = [
  {
    employeeId: "emp1",
    baseSalary: 100000,
    allowances: 15000,
    deductions: 5000,
    netSalary: 110000,
    currency: "USD",
    period: "2024-01",
  },
  {
    employeeId: "emp2",
    baseSalary: 120000,
    allowances: 18000,
    deductions: 6000,
    netSalary: 132000,
    currency: "USD",
    period: "2024-01",
  },
  {
    employeeId: "emp3",
    baseSalary: 90000,
    allowances: 12000,
    deductions: 4000,
    netSalary: 98000,
    currency: "USD",
    period: "2024-01",
  },
];

// Additional mock data for comprehensive dashboards
export const mockManagers = [
  { id: "mgr1", name: "Sarah Williams", email: "sarah.williams@company.com", department: "Engineering" },
  { id: "mgr2", name: "Michael Chen", email: "michael.chen@company.com", department: "Design" },
];

export const mockTeamMembers = [
  { id: "emp1", name: "John Doe", role: "Software Engineer", managerId: "mgr1" },
  { id: "emp2", name: "Jane Smith", role: "Product Manager", managerId: "mgr1" },
  { id: "emp4", name: "Alice Brown", role: "Frontend Developer", managerId: "mgr1" },
  { id: "emp5", name: "David Lee", role: "Backend Developer", managerId: "mgr1" },
];

export const mockComments: Comment[] = [
];

// Aliases for new UI components
export const employees = mockEmployees;
export const tasks = mockTasks.map(t => ({
  ...t,
  assignee: t.assigneeId,
  status: t.status === 'in_progress' ? 'in-progress' : t.status,
}));
export const leaveRequests = mockLeaveRequests;
export const recognitions = mockRecognitions;
export const salaryData = mockSalaryInfo.map(s => ({
  ...s,
  employeeId: s.employeeId,
  basic: s.basicSalary,
  hra: s.hra,
  allowances: s.allowances,
  bonus: s.bonus || 0,
  deductions: s.deductions,
  netSalary: s.netSalary,
  currency: s.currency || 'USD',
}));

export const dashboardStats = {
  totalEmployees: mockEmployees.length,
  tasksCompleted: mockTasks.filter(t => t.status === 'completed').length,
  pendingLeaves: mockLeaveRequests.filter(l => l.status === 'pending').length,
  activeEmployees: mockEmployees.filter(e => e.status === 'active').length,
};
  {
    id: "comment1",
    taskId: "task1",
    employeeId: "mgr1",
    employeeName: "Sarah Williams",
    comment: "Great work on the authentication module!",
    createdAt: "2024-01-18T10:30:00Z",
  },
  {
    id: "comment2",
    taskId: "task2",
    employeeId: "mgr1",
    employeeName: "Sarah Williams",
    comment: "Please prioritize this task for the upcoming release.",
    createdAt: "2024-01-19T14:20:00Z",
  },
];


