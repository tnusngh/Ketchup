"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/cards/StatCard";
import { TaskTable } from "@/components/tables/TaskTable";
import { LeaveTable } from "@/components/tables/LeaveTable";
import { PerformanceChart } from "@/components/charts/PerformanceChart";
import { TaskDistributionChart } from "@/components/charts/TaskDistributionChart";
import { EmployeeCard } from "@/components/cards/EmployeeCard";
import { Button } from "@/components/ui/button";
import { WalletModal } from "@/components/wallet/WalletModal";
import {
  employees,
  tasks,
  leaveRequests,
  dashboardStats,
} from "@/lib/mockData";
import {
  Users,
  ClipboardCheck,
  Calendar,
  AlertTriangle,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmployerDashboard() {
  const [walletModal, setWalletModal] = useState<{
    open: boolean;
    mode: 'connect' | 'view' | 'export';
  }>({ open: false, mode: 'connect' });

  const newEmployees = employees.filter((e) => e.status === 'onboarding');
  const exitingEmployees = employees.filter((e) => e.status === 'exiting');
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'pending');

  return (
    <DashboardLayout userRole="employer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Employer Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor workforce and manage operations
            </p>
          </div>
          <Button
            variant="wallet"
            onClick={() => setWalletModal({ open: true, mode: 'view' })}
          >
            <ExternalLink className="h-4 w-4" />
            View On-chain Data
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value={dashboardStats.totalEmployees}
            icon={Users}
            trend={{ value: 12, positive: true }}
            variant="primary"
          />
          <StatCard
            title="Tasks Completed"
            value={dashboardStats.tasksCompleted}
            icon={ClipboardCheck}
            trend={{ value: 8, positive: true }}
            variant="success"
          />
          <StatCard
            title="Pending Leaves"
            value={dashboardStats.pendingLeaves}
            icon={Calendar}
            variant="warning"
          />
          <StatCard
            title="Red Flags"
            value={3}
            icon={AlertTriangle}
            variant="accent"
          />
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="entry" className="space-y-4">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="entry">Entry</TabsTrigger>
            <TabsTrigger value="worklog">Work Log</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="exit">Exit Workflow</TabsTrigger>
          </TabsList>

          {/* Entry Tab */}
          <TabsContent value="entry" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                New Employees ({newEmployees.length})
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {employees.slice(0, 6).map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </TabsContent>

          {/* Work Log Tab */}
          <TabsContent value="worklog" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Task Tracker</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {tasks.filter((t) => t.status === 'completed').length} of {tasks.length} completed
                </span>
              </div>
            </div>
            <TaskTable tasks={tasks} />
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Performance Analytics
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">+15% this month</span>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <PerformanceChart />
              <TaskDistributionChart />
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Leave Approvals</h3>
              <LeaveTable leaves={leaveRequests} showActions />
            </div>
          </TabsContent>

          {/* Exit Workflow Tab */}
          <TabsContent value="exit" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Exiting Employees ({exitingEmployees.length})
              </h2>
            </div>
            {exitingEmployees.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {exitingEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="rounded-xl border bg-card p-6 space-y-4"
                  >
                    <EmployeeCard employee={employee} />
                    <div className="pt-4 border-t space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">FNF Status</span>
                        <span className="font-medium text-warning">Processing</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Handover</span>
                        <span className="font-medium text-primary">In Progress</span>
                      </div>
                      <Button
                        variant="wallet"
                        className="w-full mt-2"
                        onClick={() =>
                          setWalletModal({ open: true, mode: 'export' })
                        }
                      >
                        Export Experience to Wallet
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-12 text-center">
                <p className="text-muted-foreground">No employees in exit process</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <WalletModal
        open={walletModal.open}
        onOpenChange={(open) => setWalletModal({ ...walletModal, open })}
        mode={walletModal.mode}
      />
    </DashboardLayout>
  );
}
