"use client";

import * as React from "react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import HeaderHome from "./HeaderHome";

// Sample data
const borrowersData = [
  { name: "QLD", value: 18.6 },
  { name: "SA", value: 3.9 },
  { name: "WA", value: 3.2 },
  { name: "VIC", value: 0 },
];

const newRequestData = [
  { name: "Jan", Development: 2500, Investment: 2000, BuildAndHold: 1500 },
  { name: "Feb", Development: 3000, Investment: 2300, BuildAndHold: 1700 },
  { name: "Mar", Development: 3500, Investment: 2700, BuildAndHold: 2000 },
  { name: "Apr", Development: 4000, Investment: 3200, BuildAndHold: 2300 },
  { name: "May", Development: 4800, Investment: 3800, BuildAndHold: 2700 },
  { name: "Jun", Development: 5500, Investment: 4500, BuildAndHold: 3200 },
];
function Home() {
  return (
    <div className="mt-4">
      <HeaderHome />
    </div>
  );
}

export default Home;
