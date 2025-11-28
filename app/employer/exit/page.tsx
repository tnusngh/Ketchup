"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Timeline } from "@/components/ui/Timeline";
import { ArrowLeft, CheckCircle, XCircle, DollarSign, Package, FileCheck } from "lucide-react";
import Link from "next/link";
import { mockExitProcesses } from "@/lib/mockData";

export default function ExitWorkflowPage() {
  const [selectedExit, setSelectedExit] = useState<string | null>(mockExitProcesses[0]?.id || null);
  const exitProcess = selectedExit ? mockExitProcesses.find((e) => e.id === selectedExit) : null;

  const sidebarItems = [
    { label: "Back to Employer Dashboard", href: "/employer", icon: ArrowLeft },
  ];

  const calculateProgress = (exit: typeof mockExitProcesses[0]) => {
    let completed = 0;
    if (exit.fnfStatus === "completed") completed++;
    if (exit.assetSubmission === "completed") completed++;
    if (exit.handoverStatus === "completed") completed++;
    if (exit.credentialIssued) completed++;
    return (completed / 4) * 100;
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="employer" userName="Employer">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/employer">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Exit Workflow</h1>
        </div>

        {exitProcess && (
          <div className="space-y-4">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{exitProcess.employeeName}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Exit Date: {new Date(exitProcess.exitDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overall Progress</p>
                  <ProgressBar value={calculateProgress(exitProcess)} />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">FNF Settlement</h3>
                </div>
                <div className="space-y-2">
                  <StatusBadge status={exitProcess.fnfStatus} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Final settlement processing status
                  </p>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Asset Submission</h3>
                </div>
                <div className="space-y-2">
                  <StatusBadge status={exitProcess.assetSubmission} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Company assets return status
                  </p>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <FileCheck className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Handover Status</h3>
                </div>
                <div className="space-y-2">
                  <StatusBadge status={exitProcess.handoverStatus} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Work handover completion
                  </p>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Dues</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${exitProcess.pendingDues.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Outstanding amount to be settled
                  </p>
                </div>
              </Card>
            </div>

            <Card>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Exit Timeline</h3>
              <Timeline
                items={[
                  {
                    title: "Exit Request Initiated",
                    status: "completed",
                    date: exitProcess.exitDate,
                  },
                  {
                    title: "Department Clearance",
                    status: exitProcess.handoverStatus === "completed" ? "completed" : "pending",
                    date: exitProcess.handoverStatus === "completed" ? "2024-02-10" : "Pending",
                  },
                  {
                    title: "Asset Submission",
                    status: exitProcess.assetSubmission === "completed" ? "completed" : "pending",
                    date: exitProcess.assetSubmission === "completed" ? "2024-02-12" : "Pending",
                  },
                  {
                    title: "FNF Settlement",
                    status: exitProcess.fnfStatus === "completed" ? "completed" : "pending",
                    date: exitProcess.fnfStatus === "completed" ? "2024-02-14" : "Pending",
                  },
                  {
                    title: "Credential Issued",
                    status: exitProcess.credentialIssued ? "completed" : "pending",
                    date: exitProcess.credentialIssued ? "2024-02-15" : "Pending",
                  },
                ]}
              />
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portable Credentials</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Experience, recognition, and work proofs will be issued to employee's Pera Algo Wallet
                  </p>
                </div>
                <div>
                  <StatusBadge status={exitProcess.credentialIssued ? "completed" : "pending"} />
                </div>
              </div>
              {!exitProcess.credentialIssued && (
                <div className="mt-4">
                  <Button>Issue Credentials to Wallet</Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

