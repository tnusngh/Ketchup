"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Table } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  Users,
  ClipboardList,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import { mockEmployees, mockTasks, mockGrievances, mockComments } from "@/lib/mockData";

const currentManagerId = "mgr1"; // In real app, this would come from auth
const teamMembers = mockEmployees.filter((e) => e.managerId === currentManagerId);

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const sidebarItems = [
    { label: "Team Overview", href: "#overview", icon: Users },
    { label: "Tasks", href: "#tasks", icon: ClipboardList },
    { label: "Comments", href: "#comments", icon: MessageSquare },
    { label: "Grievances", href: "#grievances", icon: AlertTriangle },
  ];

  const teamTasks = mockTasks.filter((t) => teamMembers.some((m) => m.id === t.assigneeId));
  const grievances = mockGrievances.filter((g) => g.managerId === currentManagerId);

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="manager" userName="Sarah Williams">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Team Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{teamMembers.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {teamTasks.filter((t) => t.status === "completed").length}
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
                  {teamTasks.filter((t) => t.status !== "completed").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Grievances</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{grievances.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </div>

        <Tabs
          tabs={[
            { id: "overview", label: "Team Overview", icon: Users },
            { id: "tasks", label: "Task Management", icon: ClipboardList },
            { id: "comments", label: "Comments", icon: MessageSquare },
            { id: "grievances", label: "Grievances", icon: AlertTriangle },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "overview" && <TeamOverviewModule teamMembers={teamMembers} tasks={teamTasks} />}
        {activeTab === "tasks" && <TaskManagementModule tasks={teamTasks} />}
        {activeTab === "comments" && <CommentsModule tasks={teamTasks} />}
        {activeTab === "grievances" && <GrievancesModule grievances={grievances} />}
      </div>
    </DashboardLayout>
  );
}

function TeamOverviewModule({
  teamMembers,
  tasks,
}: {
  teamMembers: typeof mockEmployees;
  tasks: typeof mockTasks;
}) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Team Members Work Status</h2>
      <div className="space-y-4">
        {teamMembers.map((member) => {
          const memberTasks = tasks.filter((t) => t.assigneeId === member.id);
          const completed = memberTasks.filter((t) => t.status === "completed").length;
          const pending = memberTasks.filter((t) => t.status !== "completed").length;

          return (
            <div key={member.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role} • {member.department}</p>
                </div>
                <StatusBadge status={member.status} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{completed}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Tasks</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{pending}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{memberTasks.length}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function TaskManagementModule({ tasks }: { tasks: typeof mockTasks }) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Team Tasks</h2>
          <Table
            columns={[
              { key: "title", label: "Task" },
              { key: "assignee", label: "Assignee" },
              { key: "status", label: "Status" },
              { key: "priority", label: "Priority" },
              { key: "dueDate", label: "Due Date" },
            ]}
            data={tasks.map((task) => ({
              title: task.title,
              assignee: task.assigneeName,
              status: <StatusBadge status={task.status} />,
              priority: <StatusBadge status={task.priority} />,
              dueDate: new Date(task.dueDate).toLocaleDateString(),
            }))}
          />
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Task Details</h3>
          {selectedTask ? (
            <div className="space-y-3">
              {(() => {
                const task = tasks.find((t) => t.id === selectedTask);
                if (!task) return null;
                return (
                  <>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Title</p>
                      <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                      <p className="text-sm text-gray-900 dark:text-white">{task.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Assignee</p>
                      <p className="text-sm text-gray-900 dark:text-white">{task.assigneeName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                      <StatusBadge status={task.status} />
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-500">Select a task to view details</p>
          )}
        </Card>
      </div>
    </div>
  );
}

function CommentsModule({ tasks }: { tasks: typeof mockTasks }) {
  const [newComment, setNewComment] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const taskComments = selectedTaskId
    ? mockComments.filter((c) => c.taskId === selectedTaskId)
    : mockComments;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Task Comments</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                onClick={() => setSelectedTaskId(task.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                  <StatusBadge status={task.status} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Assignee: {task.assigneeName} • Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
                {taskComments.filter((c) => c.taskId === task.id).length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">Comments:</p>
                    {taskComments
                      .filter((c) => c.taskId === task.id)
                      .map((comment) => (
                        <div key={comment.id} className="mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="text-sm text-gray-900 dark:text-white">{comment.comment}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {comment.employeeName} • {new Date(comment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add Comment</h3>
          {selectedTaskId ? (
            <div className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment..."
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                rows={4}
              />
              <Button onClick={() => setNewComment("")}>Add Comment</Button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-500">Select a task to add a comment</p>
          )}
        </Card>
      </div>
    </div>
  );
}

function GrievancesModule({ grievances }: { grievances: typeof mockGrievances }) {
  return (
    <Card>
      <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <EyeOff className="w-5 h-5 text-yellow-600" />
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-200">Read-Only Access</h3>
        </div>
        <p className="text-sm text-yellow-800 dark:text-yellow-300">
          Grievances filed against you are view-only. Only an independent 3rd-party observer (POSH-like) can view
          and act on these items. You cannot modify or delete these grievances.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Grievances Filed Against You</h2>
      {grievances.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-500 text-center py-8">No grievances filed against you.</p>
      ) : (
        <div className="space-y-4">
          {grievances.map((grievance) => (
            <div
              key={grievance.id}
              className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{grievance.employeeName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Filed on {new Date(grievance.filedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <StatusBadge status={grievance.status} />
                </div>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type:</p>
                <StatusBadge status={grievance.type} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Description:</p>
                <p className="text-gray-900 dark:text-white">{grievance.description}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800">
                <p className="text-xs text-red-700 dark:text-red-300">
                  ⚠️ This grievance is under review by an independent observer. You cannot modify this information.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

