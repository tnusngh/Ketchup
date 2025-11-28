"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Table } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  UserPlus,
  ClipboardList,
  LogOut,
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { mockEmployees, mockTasks, mockMonitoringMetrics, mockExitProcesses } from "@/lib/mockData";

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("entry");

  const sidebarItems = [
    { label: "Entry", href: "#entry", icon: UserPlus },
    { label: "Work Log", href: "#worklog", icon: ClipboardList },
    { label: "Exit", href: "#exit", icon: LogOut },
    { label: "Monitoring", href: "#monitoring", icon: BarChart3 },
  ];

  const entryEmployees = mockEmployees.filter((emp) => emp.status === "active");
  const exitingEmployees = mockEmployees.filter((emp) => emp.status === "exiting");
  const completedTasks = mockTasks.filter((t) => t.status === "completed");
  const pendingTasks = mockTasks.filter((t) => t.status === "pending" || t.status === "in_progress");

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="employer" userName="Employer">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Employees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{entryEmployees.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedTasks.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingTasks.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Exiting Employees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{exitingEmployees.length}</p>
              </div>
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </div>

        <Tabs
          tabs={[
            { id: "entry", label: "Entry", icon: UserPlus },
            { id: "worklog", label: "Work Log", icon: ClipboardList },
            { id: "exit", label: "Exit", icon: LogOut },
            { id: "monitoring", label: "Monitoring", icon: BarChart3 },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "entry" && <EntryModule employees={entryEmployees} />}
        {activeTab === "worklog" && <WorkLogModule tasks={mockTasks} />}
        {activeTab === "exit" && <ExitModule exitProcesses={mockExitProcesses} />}
        {activeTab === "monitoring" && <MonitoringModule metrics={mockMonitoringMetrics} />}
      </div>
    </DashboardLayout>
  );
}

function EntryModule({ employees }: { employees: typeof mockEmployees }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">New Employee Entry</h2>
      <Table
        columns={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "department", label: "Department" },
          { key: "joinDate", label: "Join Date" },
          { key: "status", label: "Status" },
        ]}
        data={employees.map((emp) => ({
          name: emp.name,
          role: emp.role,
          department: emp.department,
          joinDate: new Date(emp.joinDate).toLocaleDateString(),
          status: <StatusBadge status={emp.status} />,
        }))}
      />
    </Card>
  );
}

function WorkLogModule({ tasks }: { tasks: typeof mockTasks }) {
  const completed = tasks.filter((t) => t.status === "completed");
  const pending = tasks.filter((t) => t.status === "pending" || t.status === "in_progress");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Completed Tasks</h3>
          <div className="space-y-3">
            {completed.map((task) => (
              <div key={task.id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                  <StatusBadge status={task.status} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>Assignee: {task.assigneeName}</span>
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Pending Tasks</h3>
          <div className="space-y-3">
            {pending.map((task) => (
              <div key={task.id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                  <StatusBadge status={task.status} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>Assignee: {task.assigneeName}</span>
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ExitModule({ exitProcesses }: { exitProcesses: typeof mockExitProcesses }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Employee Exit Process</h2>
      <div className="space-y-4">
        {exitProcesses.map((exit) => (
          <div key={exit.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{exit.employeeName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Exit Date: {new Date(exit.exitDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">FNF Status</p>
                <StatusBadge status={exit.fnfStatus} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Asset Submission</p>
                <StatusBadge status={exit.assetSubmission} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Handover</p>
                <StatusBadge status={exit.handoverStatus} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Dues</p>
                <p className="font-semibold text-gray-900 dark:text-white">${exit.pendingDues.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Credential Issued</p>
              <StatusBadge status={exit.credentialIssued ? "completed" : "pending"} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MonitoringModule({ metrics }: { metrics: typeof mockMonitoringMetrics }) {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Employee Performance Metrics</h2>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.employeeId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{metric.employeeName}</h3>
                {metric.redFlags.length > 0 && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{metric.redFlags.length} Red Flag(s)</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.completedTasks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Tasks</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.pendingTasks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time Spent (hrs)</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.timeSpent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quality Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.qualityScore}%</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Task Completion Rate</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {Math.round((metric.completedTasks / (metric.completedTasks + metric.pendingTasks)) * 100)}%
                  </span>
                </div>
                <ProgressBar
                  value={Math.round((metric.completedTasks / (metric.completedTasks + metric.pendingTasks)) * 100)}
                />
              </div>
              {metric.redFlags.length > 0 && (
                <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Red Flags:</p>
                  <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
                    {metric.redFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

