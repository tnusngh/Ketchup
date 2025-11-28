"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Table } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Timeline } from "@/components/ui/Timeline";
import {
  UserPlus,
  Users,
  LogOut,
  FileText,
  Award,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import {
  mockApplications,
  mockEmployees,
  mockDocuments,
  mockLeaveBalances,
  mockRecognitions,
  mockSalaryInfo,
  mockExitProcesses,
  mockTasks,
} from "@/lib/mockData";

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState("onboarding");

  const sidebarItems = [
    { label: "Onboarding", href: "#onboarding", icon: UserPlus },
    { label: "Existing Employees", href: "#existing", icon: Users },
    { label: "Exiting Employees", href: "#exiting", icon: LogOut },
  ];

  const activeEmployees = mockEmployees.filter((e) => e.status === "active");
  const exitingEmployees = mockEmployees.filter((e) => e.status === "exiting");

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="hr" userName="HR Manager">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">New Applications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockApplications.length}</p>
              </div>
              <UserPlus className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Employees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeEmployees.length}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Leaves</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
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
            { id: "onboarding", label: "New Employee Onboarding", icon: UserPlus },
            { id: "existing", label: "Existing Employees", icon: Users },
            { id: "exiting", label: "Exiting Employees", icon: LogOut },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "onboarding" && <OnboardingModule applications={mockApplications} />}
        {activeTab === "existing" && <ExistingEmployeesModule employees={activeEmployees} />}
        {activeTab === "exiting" && <ExitingEmployeesModule exitProcesses={mockExitProcesses} />}
      </div>
    </DashboardLayout>
  );
}

function OnboardingModule({ applications }: { applications: typeof mockApplications }) {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">New Employee Applications</h2>
        <Table
          columns={[
            { key: "candidateName", label: "Candidate" },
            { key: "position", label: "Position" },
            { key: "status", label: "Status" },
            { key: "interviewStage", label: "Interview Stage" },
            { key: "documents", label: "Documents" },
            { key: "applicationDate", label: "Applied" },
          ]}
          data={applications.map((app) => ({
            candidateName: app.candidateName,
            position: app.position,
            status: <StatusBadge status={app.status} />,
            interviewStage: `Stage ${app.interviewStage}`,
            documents: (
              <div className="flex gap-2">
                <StatusBadge status={app.documentStatus.kyc} label="KYC" size="sm" />
                <StatusBadge status={app.documentStatus.education} label="Edu" size="sm" />
                <StatusBadge status={app.documentStatus.jobDocs} label="Job" size="sm" />
              </div>
            ),
            applicationDate: new Date(app.applicationDate).toLocaleDateString(),
          }))}
        />
      </Card>
    </div>
  );
}

function ExistingEmployeesModule({ employees }: { employees: typeof mockEmployees }) {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const selectedEmp = selectedEmployee ? employees.find((e) => e.id === selectedEmployee) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1">
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Employees</h3>
          <div className="space-y-2">
            {employees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployee(emp.id)}
                className={`w-full text-left p-3 rounded-lg border transition ${
                  selectedEmployee === emp.id
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <p className="font-medium text-gray-900 dark:text-white">{emp.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{emp.role}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {selectedEmp && (
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{selectedEmp.name}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Leave Balance</h4>
                <div className="grid grid-cols-3 gap-4">
                  {mockLeaveBalances
                    .filter((lb) => lb.employeeId === selectedEmp.id)
                    .map((lb) => (
                      <div key={lb.employeeId} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Sick:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{lb.sick} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Vacation:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{lb.vacation} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Personal:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{lb.personal} days</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-gray-900 dark:text-white">Total:</span>
                          <span className="text-gray-900 dark:text-white">{lb.total} days</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Work Status Overview</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {mockTasks.filter((t) => t.assigneeId === selectedEmp.id && t.status === "completed").length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending Tasks</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {mockTasks.filter((t) => t.assigneeId === selectedEmp.id && t.status !== "completed").length}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Recognitions / Awards</h4>
                <div className="space-y-2">
                  {mockRecognitions
                    .filter((r) => r.employeeId === selectedEmp.id)
                    .map((rec) => (
                      <div key={rec.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-yellow-600" />
                          <p className="font-medium text-gray-900 dark:text-white">{rec.title}</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Issued by {rec.issuedBy} on {new Date(rec.issuedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Salary Information</h4>
                {mockSalaryInfo
                  .filter((s) => s.employeeId === selectedEmp.id)
                  .map((salary) => (
                    <div key={salary.employeeId} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Base Salary:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${salary.baseSalary.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Allowances:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${salary.allowances.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Deductions:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${salary.deductions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 font-semibold">
                        <span className="text-gray-900 dark:text-white">Net Salary:</span>
                        <span className="text-gray-900 dark:text-white">${salary.netSalary.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
              </div>

              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Documents</h4>
                <div className="space-y-2">
                  {mockDocuments
                    .filter((d) => d.employeeId === selectedEmp.id)
                    .map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">{doc.name}</span>
                        </div>
                        <StatusBadge status={doc.status} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function ExitingEmployeesModule({ exitProcesses }: { exitProcesses: typeof mockExitProcesses }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Exiting Employees</h2>
      <div className="space-y-4">
        {exitProcesses.map((exit) => (
          <div key={exit.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{exit.employeeName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Exit Date: {new Date(exit.exitDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">FNF Settlement</p>
                <StatusBadge status={exit.fnfStatus} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Asset Submission</p>
                <StatusBadge status={exit.assetSubmission} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Dues</p>
                <p className="font-semibold text-gray-900 dark:text-white">${exit.pendingDues.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Handover</p>
                <StatusBadge status={exit.handoverStatus} />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Credential Issued</p>
              <StatusBadge status={exit.credentialIssued ? "completed" : "pending"} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

