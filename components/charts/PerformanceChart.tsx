import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { performanceMetrics } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface PerformanceChartProps {
  className?: string;
}

export function PerformanceChart({ className }: PerformanceChartProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-6 shadow-card", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Weekly Performance</h3>
        <p className="text-sm text-muted-foreground">Tasks completed and quality metrics</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceMetrics}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(222, 100%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(222, 100%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 69%, 47%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(152, 69%, 47%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="week" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area
              type="monotone"
              dataKey="tasksCompleted"
              stroke="hsl(222, 100%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTasks)"
              name="Tasks Completed"
            />
            <Area
              type="monotone"
              dataKey="qualityScore"
              stroke="hsl(152, 69%, 47%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorQuality)"
              name="Quality Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Tasks Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Quality Score</span>
        </div>
      </div>
    </div>
  );
}
