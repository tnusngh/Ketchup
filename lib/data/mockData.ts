// Mock Data for KETCHUP HR System

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  role: string;
  status: 'active' | 'onboarding' | 'exiting';
  joinDate: string;
  manager: string;
  walletConnected: boolean;
  walletAddress?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  timeSpent: number; // in hours
  qualityScore?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export interface SalaryComponent {
  id: string;
  employeeId: string;
  basic: number;
  hra: number;
  allowances: number;
  deductions: number;
  bonus: number;
  netSalary: number;
  currency: string;
}

export interface Recognition {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  awardedBy: string;
  awardedDate: string;
  type: 'badge' | 'certificate' | 'bonus' | 'promotion';
  icon: string;
}

export interface ExitStatus {
  id: string;
  employeeId: string;
  employeeName: string;
  lastWorkingDay: string;
  fnfStatus: 'pending' | 'processing' | 'completed';
  assetSubmission: {
    laptop: boolean;
    idCard: boolean;
    accessCard: boolean;
    other: boolean;
  };
  handoverStatus: 'pending' | 'in-progress' | 'completed';
  experienceExported: boolean;
}

export interface OnboardingApplication {
  id: string;
  applicantName: string;
  email: string;
  position: string;
  department: string;
  applicationDate: string;
  stage: 'screened' | 'shortlisted' | 'interview' | 'selected' | 'rejected';
  kycStatus: 'pending' | 'verified' | 'rejected';
  educationStatus: 'pending' | 'verified' | 'rejected';
  documentsStatus: 'pending' | 'complete' | 'incomplete';
}

export interface PerformanceMetric {
  week: string;
  tasksCompleted: number;
  hoursWorked: number;
  qualityScore: number;
  efficiency: number;
}

// Mock Employees
export const employees: Employee[] = [
  {
    id: 'EMP001',
    name: 'Sarah Chen',
    email: 'sarah.chen@ketchup.io',
    avatar: 'SC',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'active',
    joinDate: '2023-03-15',
    manager: 'James Wilson',
    walletConnected: true,
    walletAddress: '0x1234...5678',
  },
  {
    id: 'EMP002',
    name: 'Marcus Johnson',
    email: 'marcus.j@ketchup.io',
    avatar: 'MJ',
    department: 'Design',
    role: 'UX Designer',
    status: 'active',
    joinDate: '2023-06-01',
    manager: 'Lisa Park',
    walletConnected: true,
    walletAddress: '0xabcd...efgh',
  },
  {
    id: 'EMP003',
    name: 'Emily Rodriguez',
    email: 'emily.r@ketchup.io',
    avatar: 'ER',
    department: 'Marketing',
    role: 'Marketing Manager',
    status: 'active',
    joinDate: '2022-11-20',
    manager: 'David Kim',
    walletConnected: false,
  },
  {
    id: 'EMP004',
    name: 'Alex Thompson',
    email: 'alex.t@ketchup.io',
    avatar: 'AT',
    department: 'Engineering',
    role: 'Junior Developer',
    status: 'onboarding',
    joinDate: '2024-01-10',
    manager: 'Sarah Chen',
    walletConnected: false,
  },
  {
    id: 'EMP005',
    name: 'Jennifer Lee',
    email: 'jennifer.l@ketchup.io',
    avatar: 'JL',
    department: 'HR',
    role: 'HR Specialist',
    status: 'exiting',
    joinDate: '2021-08-15',
    manager: 'Robert Brown',
    walletConnected: true,
    walletAddress: '0x9876...5432',
  },
];

// Mock Tasks
export const tasks: Task[] = [
  {
    id: 'TASK001',
    title: 'Implement user authentication',
    description: 'Add OAuth2 support for wallet-based login',
    assignee: 'EMP001',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-02-15',
    timeSpent: 12,
    qualityScore: 92,
  },
  {
    id: 'TASK002',
    title: 'Design dashboard components',
    description: 'Create reusable card and table components',
    assignee: 'EMP002',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-02-10',
    timeSpent: 8,
    qualityScore: 95,
  },
  {
    id: 'TASK003',
    title: 'Marketing campaign Q1',
    description: 'Plan and execute Q1 social media campaign',
    assignee: 'EMP003',
    status: 'review',
    priority: 'high',
    dueDate: '2024-02-20',
    timeSpent: 24,
    qualityScore: 88,
  },
  {
    id: 'TASK004',
    title: 'Setup development environment',
    description: 'Configure local dev setup with all dependencies',
    assignee: 'EMP004',
    status: 'todo',
    priority: 'urgent',
    dueDate: '2024-01-15',
    timeSpent: 0,
  },
  {
    id: 'TASK005',
    title: 'Knowledge transfer documentation',
    description: 'Document all HR processes for handover',
    assignee: 'EMP005',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-02-01',
    timeSpent: 16,
    qualityScore: 90,
  },
];

// Mock Leave Requests
export const leaveRequests: LeaveRequest[] = [
  {
    id: 'LR001',
    employeeId: 'EMP001',
    employeeName: 'Sarah Chen',
    type: 'annual',
    startDate: '2024-02-20',
    endDate: '2024-02-25',
    status: 'pending',
    reason: 'Family vacation',
  },
  {
    id: 'LR002',
    employeeId: 'EMP002',
    employeeName: 'Marcus Johnson',
    type: 'sick',
    startDate: '2024-01-28',
    endDate: '2024-01-29',
    status: 'approved',
    reason: 'Medical appointment',
  },
  {
    id: 'LR003',
    employeeId: 'EMP003',
    employeeName: 'Emily Rodriguez',
    type: 'personal',
    startDate: '2024-02-14',
    endDate: '2024-02-14',
    status: 'approved',
    reason: 'Personal errands',
  },
];

// Mock Salary Components
export const salaryData: SalaryComponent[] = [
  {
    id: 'SAL001',
    employeeId: 'EMP001',
    basic: 8000,
    hra: 2000,
    allowances: 1500,
    deductions: 1200,
    bonus: 500,
    netSalary: 10800,
    currency: 'USD',
  },
  {
    id: 'SAL002',
    employeeId: 'EMP002',
    basic: 6500,
    hra: 1600,
    allowances: 1200,
    deductions: 950,
    bonus: 300,
    netSalary: 8650,
    currency: 'USD',
  },
];

// Mock Recognition
export const recognitions: Recognition[] = [
  {
    id: 'REC001',
    employeeId: 'EMP001',
    title: 'Innovation Champion',
    description: 'For implementing blockchain-based credential verification',
    awardedBy: 'James Wilson',
    awardedDate: '2024-01-15',
    type: 'badge',
    icon: '🏆',
  },
  {
    id: 'REC002',
    employeeId: 'EMP002',
    title: 'Design Excellence',
    description: 'Outstanding contribution to KETCHUP UI redesign',
    awardedBy: 'Lisa Park',
    awardedDate: '2024-01-10',
    type: 'certificate',
    icon: '🎨',
  },
  {
    id: 'REC003',
    employeeId: 'EMP003',
    title: 'Top Performer Q4',
    description: 'Exceeded marketing targets by 150%',
    awardedBy: 'David Kim',
    awardedDate: '2023-12-28',
    type: 'bonus',
    icon: '⭐',
  },
];

// Mock Exit Status
export const exitStatuses: ExitStatus[] = [
  {
    id: 'EXIT001',
    employeeId: 'EMP005',
    employeeName: 'Jennifer Lee',
    lastWorkingDay: '2024-02-15',
    fnfStatus: 'processing',
    assetSubmission: {
      laptop: true,
      idCard: true,
      accessCard: false,
      other: true,
    },
    handoverStatus: 'in-progress',
    experienceExported: false,
  },
];

// Mock Onboarding Applications
export const onboardingApplications: OnboardingApplication[] = [
  {
    id: 'APP001',
    applicantName: 'Alex Thompson',
    email: 'alex.t@email.com',
    position: 'Junior Developer',
    department: 'Engineering',
    applicationDate: '2024-01-05',
    stage: 'selected',
    kycStatus: 'verified',
    educationStatus: 'verified',
    documentsStatus: 'complete',
  },
  {
    id: 'APP002',
    applicantName: 'Michael Brown',
    email: 'michael.b@email.com',
    position: 'Product Manager',
    department: 'Product',
    applicationDate: '2024-01-12',
    stage: 'interview',
    kycStatus: 'verified',
    educationStatus: 'pending',
    documentsStatus: 'incomplete',
  },
  {
    id: 'APP003',
    applicantName: 'Anna Smith',
    email: 'anna.s@email.com',
    position: 'Data Analyst',
    department: 'Analytics',
    applicationDate: '2024-01-18',
    stage: 'shortlisted',
    kycStatus: 'pending',
    educationStatus: 'pending',
    documentsStatus: 'pending',
  },
];

// Mock Performance Metrics
export const performanceMetrics: PerformanceMetric[] = [
  { week: 'Week 1', tasksCompleted: 12, hoursWorked: 40, qualityScore: 88, efficiency: 85 },
  { week: 'Week 2', tasksCompleted: 15, hoursWorked: 42, qualityScore: 92, efficiency: 90 },
  { week: 'Week 3', tasksCompleted: 10, hoursWorked: 38, qualityScore: 85, efficiency: 82 },
  { week: 'Week 4', tasksCompleted: 18, hoursWorked: 45, qualityScore: 94, efficiency: 93 },
];

// Dashboard Stats
export const dashboardStats = {
  totalEmployees: 156,
  activeProjects: 24,
  pendingLeaves: 8,
  tasksCompleted: 342,
  onboardingCount: 5,
  exitingCount: 2,
  avgQualityScore: 91,
  walletSynced: 89,
};
