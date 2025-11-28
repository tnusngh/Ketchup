"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserCog,
  Briefcase,
  ClipboardList,
  Calendar,
  Award,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  userRole: 'employer' | 'hr' | 'employee' | 'manager';
}

const roleConfig = {
  employer: {
    label: 'Employer',
    icon: Building2,
    routes: [
      { path: '/employer', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/employer/employees', label: 'Employees', icon: Users },
      { path: '/employer/tasks', label: 'Work Log', icon: ClipboardList },
      { path: '/employer/monitoring', label: 'Monitoring', icon: Briefcase },
      { path: '/employer/exit', label: 'Exit Workflow', icon: LogOut },
    ],
  },
  hr: {
    label: 'HR Admin',
    icon: UserCog,
    routes: [
      { path: '/hr', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/hr/onboarding', label: 'Onboarding', icon: UserCheck },
      { path: '/hr/employees', label: 'Employees', icon: Users },
      { path: '/hr/leaves', label: 'Leave Requests', icon: Calendar },
      { path: '/hr/exit', label: 'Exit Process', icon: LogOut },
    ],
  },
  employee: {
    label: 'Employee',
    icon: Users,
    routes: [
      { path: '/employee', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/employee/tasks', label: 'My Tasks', icon: ClipboardList },
      { path: '/employee/leaves', label: 'Leave', icon: Calendar },
      { path: '/employee/recognition', label: 'Recognition', icon: Award },
      { path: '/employee/documents', label: 'Documents', icon: FileText },
    ],
  },
  manager: {
    label: 'Manager',
    icon: UserCog,
    routes: [
      { path: '/manager', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/manager/team', label: 'My Team', icon: Users },
      { path: '/manager/tasks', label: 'Team Tasks', icon: ClipboardList },
      { path: '/manager/approvals', label: 'Approvals', icon: Calendar },
    ],
  },
};

export function Sidebar({ userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const config = roleConfig[userRole];
  const RoleIcon = config.icon;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">K</span>
              </div>
              <span className="font-bold text-lg text-sidebar-foreground">KETCHUP</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn("h-8 w-8", collapsed && "mx-auto")}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Role Badge */}
        <div className={cn(
          "mx-3 mt-4 rounded-lg bg-sidebar-accent p-3",
          collapsed && "mx-2 p-2"
        )}>
          <div className="flex items-center gap-2">
            <RoleIcon className="h-4 w-4 text-sidebar-primary" />
            {!collapsed && (
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {config.label}
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {config.routes.map((route) => {
              const Icon = route.icon;
              const isActive = pathname === route.path;
              return (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{route.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Settings */}
        <div className="border-t border-sidebar-border p-3">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-all",
              collapsed && "justify-center px-2"
            )}
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span>Settings</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}
