"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Timeline } from "@/components/ui/Timeline";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import { mockApplications } from "@/lib/mockData";

export default function OnboardingPage() {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const application = selectedApplication
    ? mockApplications.find((app) => app.id === selectedApplication)
    : null;

  const sidebarItems = [
    { label: "Back to HR Dashboard", href: "/hr", icon: ArrowLeft },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="hr" userName="HR Manager">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/hr">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Employee Onboarding</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Applications</h3>
              <div className="space-y-2">
                {mockApplications.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedApplication(app.id)}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      selectedApplication === app.id
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{app.candidateName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{app.position}</p>
                    <StatusBadge status={app.status} className="mt-2" />
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {application && (
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{application.candidateName}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{application.email}</p>
                  </div>
                  <StatusBadge status={application.status} />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Application Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Position</p>
                        <p className="font-medium text-gray-900 dark:text-white">{application.position}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Application Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(application.applicationDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Interview Stage</p>
                        <p className="font-medium text-gray-900 dark:text-white">Stage {application.interviewStage}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Document Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="text-sm text-gray-900 dark:text-white">KYC Documents</span>
                        <StatusBadge status={application.documentStatus.kyc} />
                      </div>
                      <div className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="text-sm text-gray-900 dark:text-white">Education Documents</span>
                        <StatusBadge status={application.documentStatus.education} />
                      </div>
                      <div className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="text-sm text-gray-900 dark:text-white">Job Documents</span>
                        <StatusBadge status={application.documentStatus.jobDocs} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Onboarding Workflow</h3>
                    <Timeline
                      items={[
                        {
                          title: "Application Received",
                          status: "completed",
                          date: application.applicationDate,
                        },
                        {
                          title: "Initial Screening",
                          status: application.interviewStage >= 1 ? "completed" : "pending",
                          date: application.interviewStage >= 1 ? "2024-01-11" : "Pending",
                        },
                        {
                          title: "Interview",
                          status: application.interviewStage >= 2 ? "completed" : "pending",
                          date: application.interviewStage >= 2 ? "2024-01-15" : "Pending",
                        },
                        {
                          title: "Offer Extended",
                          status: application.status === "selected" ? "completed" : "pending",
                          date: application.status === "selected" ? "2024-01-20" : "Pending",
                        },
                        {
                          title: "Onboarding Complete",
                          status: "pending",
                          date: "Pending",
                        },
                      ]}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button>Update Status</Button>
                    <Button variant="outline">View Documents</Button>
                    {application.status === "selected" && <Button>Start Onboarding</Button>}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

