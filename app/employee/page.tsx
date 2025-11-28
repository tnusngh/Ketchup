"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Table } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import {
  ClipboardList,
  Calendar,
  Award,
  DollarSign,
  FileText,
  Wallet,
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  mockWorkLogs,
  mockTasks,
  mockLeaveRequests,
  mockLeaveBalances,
  mockRecognitions,
  mockSalaryInfo,
  mockDocuments,
} from "@/lib/mockData";

const currentEmployeeId = "emp1"; // In real app, this would come from auth

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState("worklog");

  const sidebarItems = [
    { label: "Work Log", href: "#worklog", icon: ClipboardList },
    { label: "Tasks", href: "#tasks", icon: CheckCircle },
    { label: "Leave", href: "#leave", icon: Calendar },
    { label: "Recognition", href: "#recognition", icon: Award },
    { label: "Salary", href: "#salary", icon: DollarSign },
    { label: "Documents", href: "#documents", icon: FileText },
    { label: "Credentials", href: "#credentials", icon: Wallet },
    { label: "Notifications", href: "#notifications", icon: Bell },
  ];

  const myTasks = mockTasks.filter((t) => t.assigneeId === currentEmployeeId);
  const myLeaves = mockLeaveRequests.filter((l) => l.employeeId === currentEmployeeId);
  const myLeaveBalance = mockLeaveBalances.find((lb) => lb.employeeId === currentEmployeeId);
  const myRecognitions = mockRecognitions.filter((r) => r.employeeId === currentEmployeeId);
  const mySalary = mockSalaryInfo.find((s) => s.employeeId === currentEmployeeId);
  const myDocuments = mockDocuments.filter((d) => d.employeeId === currentEmployeeId);
  const myWorkLogs = mockWorkLogs.filter((w) => w.employeeId === currentEmployeeId);

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="employee" userName="John Doe">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {myTasks.filter((t) => t.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {myTasks.filter((t) => t.status !== "completed").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Leave Balance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{myLeaveBalance?.total || 0} days</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recognitions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{myRecognitions.length}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>

        <Tabs
          tabs={[
            { id: "worklog", label: "Daily Work Log", icon: ClipboardList },
            { id: "tasks", label: "Tasks", icon: CheckCircle },
            { id: "leave", label: "Leave Application", icon: Calendar },
            { id: "recognition", label: "Recognition History", icon: Award },
            { id: "salary", label: "Salary Components", icon: DollarSign },
            { id: "documents", label: "Documents", icon: FileText },
            { id: "credentials", label: "Portable Credentials", icon: Wallet },
            { id: "notifications", label: "Notifications", icon: Bell },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "worklog" && <WorkLogModule workLogs={myWorkLogs} />}
        {activeTab === "tasks" && <TasksModule tasks={myTasks} />}
        {activeTab === "leave" && <LeaveModule leaves={myLeaves} leaveBalance={myLeaveBalance} />}
        {activeTab === "recognition" && <RecognitionModule recognitions={myRecognitions} />}
        {activeTab === "salary" && <SalaryModule salary={mySalary} />}
        {activeTab === "documents" && <DocumentsModule documents={myDocuments} />}
        {activeTab === "credentials" && <CredentialsModule recognitions={myRecognitions} />}
        {activeTab === "notifications" && <NotificationsModule />}
      </div>
    </DashboardLayout>
  );
}

function WorkLogModule({ workLogs }: { workLogs: typeof mockWorkLogs }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Daily Work Log</h2>
        <Button>Add Entry</Button>
      </div>
      <Table
        columns={[
          { key: "date", label: "Date" },
          { key: "hoursWorked", label: "Hours Worked" },
          { key: "tasksCompleted", label: "Tasks Completed" },
          { key: "notes", label: "Notes" },
        ]}
        data={workLogs.map((log) => ({
          date: new Date(log.date).toLocaleDateString(),
          hoursWorked: `${log.hoursWorked} hrs`,
          tasksCompleted: log.tasksCompleted,
          notes: log.notes,
        }))}
      />
    </Card>
  );
}

function TasksModule({ tasks }: { tasks: typeof mockTasks }) {
  const completed = tasks.filter((t) => t.status === "completed");
  const inProgress = tasks.filter((t) => t.status === "in_progress");
  const pending = tasks.filter((t) => t.status === "pending");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Assigned</h3>
          <div className="space-y-3">
            {pending.map((task) => (
              <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">{task.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                <div className="flex items-center justify-between">
                  <StatusBadge status={task.status} />
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">In Progress</h3>
          <div className="space-y-3">
            {inProgress.map((task) => (
              <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">{task.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                <div className="flex items-center justify-between">
                  <StatusBadge status={task.status} />
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Completed</h3>
          <div className="space-y-3">
            {completed.map((task) => (
              <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">{task.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                <div className="flex items-center justify-between">
                  <StatusBadge status={task.status} />
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function LeaveModule({
  leaves,
  leaveBalance,
}: {
  leaves: typeof mockLeaveRequests;
  leaveBalance?: (typeof mockLeaveBalances)[0];
}) {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Leave Balance</h3>
        {leaveBalance && (
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sick Leave</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveBalance.sick} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Vacation</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveBalance.vacation} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Personal</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveBalance.personal} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaveBalance.total} days</p>
            </div>
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leave Applications</h3>
          <Button>Apply for Leave</Button>
        </div>
        <Table
          columns={[
            { key: "type", label: "Type" },
            { key: "startDate", label: "Start Date" },
            { key: "endDate", label: "End Date" },
            { key: "status", label: "Status" },
            { key: "reason", label: "Reason" },
          ]}
          data={leaves.map((leave) => ({
            type: leave.type,
            startDate: new Date(leave.startDate).toLocaleDateString(),
            endDate: new Date(leave.endDate).toLocaleDateString(),
            status: <StatusBadge status={leave.status} />,
            reason: leave.reason,
          }))}
        />
      </Card>
    </div>
  );
}

function RecognitionModule({ recognitions }: { recognitions: typeof mockRecognitions }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recognition History</h2>
      <div className="space-y-4">
        {recognitions.map((rec) => (
          <div key={rec.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{rec.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{rec.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                  <span>Issued by: {rec.issuedBy}</span>
                  <span>Date: {new Date(rec.issuedAt).toLocaleDateString()}</span>
                  {rec.credentialHash && (
                    <span className="text-blue-600 dark:text-blue-400">Credential: {rec.credentialHash}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SalaryModule({ salary }: { salary?: (typeof mockSalaryInfo)[0] }) {
  if (!salary) return <Card>No salary information available</Card>;

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Salary Components</h2>
      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Base Salary</span>
          <span className="font-semibold text-gray-900 dark:text-white">${salary.baseSalary.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Allowances</span>
          <span className="font-semibold text-gray-900 dark:text-white">${salary.allowances.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Deductions</span>
          <span className="font-semibold text-gray-900 dark:text-white">-${salary.deductions.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-3 pt-3 border-t-2 border-gray-300 dark:border-gray-600">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Net Salary</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">${salary.netSalary.toLocaleString()}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Period: {salary.period}</p>
      </div>
    </Card>
  );
}

function DocumentsModule({ documents }: { documents: typeof mockDocuments }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Documents</h2>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {doc.type} • {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <StatusBadge status={doc.status} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function CredentialsModule({ recognitions }: { recognitions: typeof mockRecognitions }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portable Credentials</h2>
        <WalletConnect />
      </div>
      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Your work proofs, recognitions, and experience credentials are stored in your Pera Algo Wallet. Click
          "Sync Credentials" to update your wallet with the latest credentials.
        </p>
      </div>
      <div className="space-y-4">
        {recognitions
          .filter((r) => r.credentialHash)
          .map((rec) => (
            <div key={rec.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{rec.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{rec.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Credential Hash: {rec.credentialHash}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Export Proof
                </Button>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4">
        <Button className="w-full">Sync Credentials with Pera Wallet</Button>
      </div>
    </Card>
  );
}

function NotificationsModule() {
  const notifications = [
    { id: "1", message: "Your leave request has been approved", time: "2 hours ago", type: "success" },
    { id: "2", message: "New task assigned: Fix bug in payment module", time: "5 hours ago", type: "info" },
    { id: "3", message: "You received a recognition: Employee of the Month", time: "1 day ago", type: "success" },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Notifications</h2>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <p className="text-gray-900 dark:text-white">{notif.message}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notif.time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

