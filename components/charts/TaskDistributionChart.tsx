import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { tasks } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface TaskDistributionChartProps {
  className?: string;
}

export function TaskDistributionChart({ className }: TaskDistributionChartProps) {
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { name: 'To Do', value: statusCounts['todo'] || 0, color: 'hsl(var(--muted-foreground))' },
    { name: 'In Progress', value: statusCounts['in-progress'] || 0, color: 'hsl(222, 100%, 60%)' },
    { name: 'In Review', value: statusCounts['review'] || 0, color: 'hsl(14, 100%, 63%)' },
    { name: 'Completed', value: statusCounts['completed'] || 0, color: 'hsl(152, 69%, 47%)' },
  ];

  return (
    <div className={cn("rounded-xl border bg-card p-6 shadow-card", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Task Distribution</h3>
        <p className="text-sm text-muted-foreground">Current task status breakdown</p>
      </div>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
