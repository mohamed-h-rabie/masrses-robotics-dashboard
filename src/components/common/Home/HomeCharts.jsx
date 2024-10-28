import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
function HomeCharts() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 ">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Borrowers by State</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={{
                borrowers: {
                  label: "Borrowers",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={borrowersData}>
                  <Bar
                    dataKey="value"
                    fill="var(--color-borrowers)"
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Map Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative bg-slate-50 rounded-md">
              {/* Placeholder for the map */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                Map of Australia
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>New Request Trend</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={{
                Development: {
                  label: "Development",
                  color: "hsl(var(--chart-1))",
                },
                Investment: {
                  label: "Investment",
                  color: "hsl(var(--chart-2))",
                },
                BuildAndHold: {
                  label: "Build and Hold",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={newRequestData}>
                  <Line
                    type="monotone"
                    dataKey="Development"
                    stroke="var(--color-Development)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Investment"
                    stroke="var(--color-Investment)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="BuildAndHold"
                    stroke="var(--color-BuildAndHold)"
                    strokeWidth={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomeCharts;
