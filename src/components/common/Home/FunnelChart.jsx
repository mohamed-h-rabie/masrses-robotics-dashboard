"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreVertical } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const initialData = [
  { month: "January", desktop: 8, mobile: 4 },
  { month: "February", desktop: 32, mobile: 21 },
  { month: "March", desktop: 60, mobile: 12 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export default function FunnelChart() {
  const [data, setData] = useState(initialData);
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState(null);

  const applyFilter = (value) => {
    let filteredData = [...initialData];
    if (filterType === "value" && value) {
      filteredData = filteredData.filter(
        (item) => item.desktop + item.mobile >= parseFloat(value)
      );
    } else {
      filteredData = initialData;
    }
    setData(filteredData);
  };

  return (
    <Card className="w-full !h-[400px]">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 pb-2">
        <CardTitle className="text-lg md:text-xl font-bold">Details</CardTitle>
        <div className="flex space-x-2">
          {filterType === "value" && (
            <input
              type="text"
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                applyFilter(e.target.value);
              }}
              placeholder="Min value"
              className="border rounded px-2 py-1 w-full sm:w-[100px]"
            />
          )}
          <Select
            onValueChange={(e) => {
              setFilterType(e);
              if (e === "all") {
                setData(initialData);
              }
            }}
            value={filterType}
          >
            <SelectTrigger>
              <MoreVertical className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Data</SelectItem>
              <SelectItem value="value">By Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <div className="flex justify-between mx-10 text-sm font-bold mt-2">
        <div className="space-y-1 text-center">
          <h3 className="text-2xl">27.8K</h3>
          <p className="text-muted-foreground">Opened Request</p>
        </div>
        <div className="space-y-1 text-center">
          <h3 className="text-2xl">67%</h3>
          <p className="text-muted-foreground">Engaged</p>
        </div>
        <div className="space-y-1 text-center">
          <h3 className="text-2xl">24%</h3>
          <p className="text-muted-foreground">EOI Sent</p>
        </div>
      </div>
      <CardContent>
        <ChartContainer className="!h-[250px] w-full" config={chartConfig}>
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="monotone"
              fill={chartConfig.mobile.color}
              fillOpacity={0.4}
              stroke={chartConfig.mobile.color}
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="monotone"
              fill={chartConfig.desktop.color}
              fillOpacity={0.4}
              stroke={chartConfig.desktop.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
