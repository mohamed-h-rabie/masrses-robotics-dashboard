"use client";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { BorrowersChart } from "./BorrowersChart";
import Map from "./Map";
import FunnelChart from "./FunnelChart";
// Sample data
const initialData = [
  { name: "QLD", value: 18.6, color: "#4285F4", date: "2023-01-15" },
  { name: "SA", value: 3.9, color: "#34A853", date: "2023-02-20" },
  { name: "WA", value: 3.2, color: "#FBBC05", date: "2023-03-10" },
  { name: "VIC", value: 0, color: "#EA4335", date: "2023-04-05" },
];

const newRequestData = [
  { name: "Jan", Development: 2500, Investment: 2000, BuildAndHold: 1500 },
  { name: "Feb", Development: 3000, Investment: 2300, BuildAndHold: 1700 },
  { name: "Mar", Development: 3500, Investment: 2700, BuildAndHold: 2000 },
  { name: "Apr", Development: 4000, Investment: 3200, BuildAndHold: 2300 },
  { name: "May", Development: 4800, Investment: 3800, BuildAndHold: 2700 },
  { name: "Jun", Development: 5500, Investment: 4500, BuildAndHold: 3200 },
];
export const description = "A radial chart with stacked sections";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#2563eb",
  },
};
const chartData = [
  { name: "Desktop", desktop: 186, fill: chartConfig.desktop.color },
  { name: "Mobile", mobile: 80, fill: chartConfig.mobile.color },
];
function HomeCharts() {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="col-span-2">
          <BorrowersChart />
        </Card>
        <Card className="col-span-2">
          <FunnelChart />
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="col-span-2">
          <BorrowersChart />
        </Card>
        <Card className="col-span-2">
          <BorrowersChart />
        </Card>
      </div>
    </div>
  );
}

export default HomeCharts;
