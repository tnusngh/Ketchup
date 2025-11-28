"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/cards/StatCard";
import { TaskCard } from "@/components/cards/TaskCard";
import { RecognitionCard } from "@/components/cards/RecognitionCard";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import { ProgressRing } from "@/components/atoms/ProgressRing";
import { Button } from "@/components/ui/button";
import { WalletModal } from "@/components/wallet/WalletModal";
import { Progress } from "@/components/ui/progress";
import {
  tasks,
  leaveRequests,
  recognitions,
  salaryData,
} from "@/lib/mockData";
import {
  ClipboardList,
  Calendar,
  Award,
  Bell,
  Wallet,
  FileText,
  Clock,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function EmployeeDashboard() {
  const [walletModal, setWalletModal] = useState<{
    open: boolean;
    mode: 'connect' | 'view' | 'export';
  }>({ open: false, mode: 'connect' });

  const myTasks = tasks.filter((t) => t.assignee === 'EMP001');
  const myLeaves = leaveRequests.filter((l) => l.employeeId === 'EMP001');
  const myRecognitions = recognitions.filter((r) => r.employeeId === 'EMP001');
  const mySalary = salaryData.find((s) => s.employeeId === 'EMP001');

  const completedTasks = myTasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = myTasks.filter((t) => t.status === 'in-progress').length;

  return (
    <DashboardLayout userRole="employee">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Sarah! Here's your work summary.
            </p>
          </div>
          <Button
            variant="wallet"
            onClick={() => setWalletModal({ open: true, mode: 'connect' })}
          >
            <Wallet className="h-4 w-4" />
            Sync with Pera Wallet
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Tasks Assigned"
            value={myTasks.length}
            icon={ClipboardList}
            variant="primary"
          />
          <StatCard
            title="In Progress"
            value={inProgressTasks}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Completed"
            value={completedTasks}
            icon={Award}
            trend={{ value: 15, positive: true }}
            variant="success"
          />
          <StatCard
            title="Leave Balance"
            value="18 days"
            icon={Calendar}
            variant="default"
          />
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="worklog" className="space-y-4">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="worklog">Daily Work Log</TabsTrigger>
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="leave">Leave</TabsTrigger>
            <TabsTrigger value="salary">Salary</TabsTrigger>
            <TabsTrigger value="recognition">Recognition</TabsTrigger>
          </TabsList>

          {/* Work Log Tab */}
          <TabsContent value="worklog" className="space-y-4">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-4">Log Today's Work</h3>
              <div className="space-y-4">
                <Textarea
                  placeholder="What did you work on today? Describe your tasks and progress..."
                  className="min-h-[120px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: 2 hours ago</span>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4" />
                    Submit Log
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-4">Recent Logs</h3>
              <div className="space-y-4">
                {[
                  {
                    date: 'Today',
                    content: 'Implemented user authentication module. Fixed 3 bugs in dashboard.',
                    hours: 6,
                  },
                  {
                    date: 'Yesterday',
                    content: 'Code review for team members. Attended sprint planning meeting.',
                    hours: 7,
                  },
                  {
                    date: 'Jan 25',
                    content: 'Completed API integration. Documentation updates.',
                    hours: 8,
                  },
                ].map((log, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{log.date}</span>
                        <span className="text-xs text-muted-foreground">
                          {log.hours}h logged
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">My Tasks</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <ProgressRing value={(completedTasks / myTasks.length) * 100} size={40} />
                  <span className="text-sm text-muted-foreground">
                    {completedTasks}/{myTasks.length} done
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {myTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          {/* Leave Tab */}
          <TabsContent value="leave" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold mb-4">Leave Balance</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Annual', total: 20, used: 5, color: 'primary' },
                    { type: 'Sick', total: 10, used: 2, color: 'warning' },
                    { type: 'Personal', total: 5, used: 1, color: 'accent' },
                  ].map((leave) => (
                    <div key={leave.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{leave.type}</span>
                        <span className="text-muted-foreground">
                          {leave.total - leave.used} remaining
                        </span>
                      </div>
                      <Progress
                        value={(leave.used / leave.total) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6">
                  <Plus className="h-4 w-4" />
                  Apply for Leave
                </Button>
              </div>

              <div className="lg:col-span-2 rounded-xl border bg-card p-6">
                <h3 className="font-semibold mb-4">Leave History</h3>
                <div className="space-y-3">
                  {myLeaves.length > 0 ? (
                    myLeaves.map((leave) => (
                      <div
                        key={leave.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                      >
                        <div>
                          <p className="font-medium capitalize">{leave.type} Leave</p>
                          <p className="text-sm text-muted-foreground">
                            {leave.startDate} - {leave.endDate}
                          </p>
                        </div>
                        <StatusBadge status={leave.status} />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No leave requests yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Salary Tab */}
          <TabsContent value="salary" className="space-y-4">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-6">Salary Breakdown</h3>
              {mySalary && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Earnings
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 rounded-lg bg-success/5 border border-success/10">
                        <span>Basic Salary</span>
                        <span className="font-semibold">
                          ${mySalary.basic.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-success/5 border border-success/10">
                        <span>HRA</span>
                        <span className="font-semibold">
                          ${mySalary.hra.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-success/5 border border-success/10">
                        <span>Allowances</span>
                        <span className="font-semibold">
                          ${mySalary.allowances.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <span>Bonus</span>
                        <span className="font-semibold text-success">
                          +${mySalary.bonus.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Deductions
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                        <span>Tax & Deductions</span>
                        <span className="font-semibold text-destructive">
                          -${mySalary.deductions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-8 p-4 rounded-xl gradient-primary text-primary-foreground">
                      <p className="text-sm opacity-90">Net Salary</p>
                      <p className="text-3xl font-bold">
                        ${mySalary.netSalary.toLocaleString()}
                      </p>
                      <p className="text-sm opacity-75 mt-1">
                        Per month • {mySalary.currency}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Recognition Tab */}
          <TabsContent value="recognition" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                My Achievements
              </h2>
              <span className="text-sm text-muted-foreground">
                {myRecognitions.length} awards earned
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myRecognitions.map((recognition) => (
                <RecognitionCard key={recognition.id} recognition={recognition} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Notifications Panel */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </h3>
            <Button variant="ghost" size="sm">
              Mark all read
            </Button>
          </div>
          <div className="space-y-3">
            {[
              {
                title: 'Leave Approved',
                message: 'Your annual leave request has been approved',
                time: '2 hours ago',
                read: false,
              },
              {
                title: 'New Task Assigned',
                message: 'You have been assigned to "API Integration"',
                time: '5 hours ago',
                read: false,
              },
              {
                title: 'Recognition Received',
                message: 'James Wilson awarded you "Innovation Champion"',
                time: '1 day ago',
                read: true,
              },
            ].map((notif, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg ${
                  notif.read ? 'bg-muted/30' : 'bg-primary/5 border border-primary/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{notif.title}</p>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Documents
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Offer Letter', date: 'Mar 15, 2023', type: 'PDF' },
              { name: 'NDA Agreement', date: 'Mar 15, 2023', type: 'PDF' },
              { name: 'Appraisal Letter', date: 'Jan 10, 2024', type: 'PDF' },
              { name: 'Tax Documents', date: 'Jan 05, 2024', type: 'PDF' },
            ].map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-lg border bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors"
              >
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-sm">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WalletModal
        open={walletModal.open}
        onOpenChange={(open) => setWalletModal({ ...walletModal, open })}
        mode={walletModal.mode}
      />
    </DashboardLayout>
  );
}
