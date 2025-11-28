"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  LogOut,
  Bell,
  Wallet,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: Array<{
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  userRole?: string;
  userName?: string;
}

export function DashboardLayout({
  children,
  sidebarItems,
  userRole,
  userName = "User",
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar items={sidebarItems} userRole={userRole} />
      <div className="flex-1 ml-64">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard` : "Dashboard"}
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userRole}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6 overflow-y-auto h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  );
}


