"use client";

import { GlassCard } from "@/components/ui/glass-card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useSWR from "swr";

interface ChartData {
  date: string;
  queries: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Generate mock data for the chart
const generateMockData = (): ChartData[] => {
  const data: ChartData[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      queries: Math.floor(Math.random() * 50) + 10,
    });
  }

  return data;
};

export function UsageChart() {
  const { data: chartData } = useSWR<ChartData[]>(
    "/api/user/usage-chart",
    fetcher,
    {
      fallbackData: generateMockData(),
    }
  );

  return (
    <GlassCard hoverEffect={false} className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">AI Usage Trends</h3>
        <span className="rounded-full bg-neon-blue/10 px-3 py-1 text-xs font-medium text-neon-blue">
          Last 7 days
        </span>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.3)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(13, 13, 13, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "#FAFAFA" }}
              itemStyle={{ color: "#00D4FF" }}
            />
            <Area
              type="monotone"
              dataKey="queries"
              stroke="#00D4FF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorQueries)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
