import { useState } from "react";
import { useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
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
import { MoreVertical, TrendingUp } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const initialData = [
  {
    name: "old",
    value: 18.6,
    fill: "var(--color-old)",
    color: "#4285F4",
    date: "2024-10-15",
  },
  {
    name: "sa",
    value: 3.9,
    fill: "var(--color-sa)",
    color: "#34A853",
    date: "2023-04-05",
  },
  {
    name: "wa",
    value: 3.2,
    fill: "var(--color-wa)",
    color: "#FBBC05",
    date: "2023-03-10",
  },
  {
    name: "vic",
    value: 0,
    fill: "var(--color-vic)",
    color: "#EA4335",
    date: "2023-02-20",
  },
];

const chartConfig = {
  value: {
    label: "Value",
  },
  old: {
    label: "Old",
    color: "#4285F4",
  },
  sa: {
    label: "Sa",
    color: "#34A853",
  },
  wa: {
    label: "Wa",
    color: "#FBBC05",
  },
  vic: {
    label: "Vic",
    color: "#EA4335",
  },
};
export function BorrowersChart() {
  const [data, setData] = useState(initialData);
  const [filterType, setFilterType] = useState("date");
  const [filterValue, setFilterValue] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

  const applyFilter = (value) => {
    let filteredData = [...initialData];
    if (filterType === "numbers" && value) {
      filteredData = filteredData.filter(
        (item) => item.value >= parseFloat(value)
      );
    } else if (filterType === "date" && value) {
      filteredData = filteredData.filter(
        (item) => new Date(item.date) >= value
      );
    } else if (filterType === "all") {
      setFilterValue("");
      setFilterDate();
      filteredData = initialData;
    }
    setData(filteredData);
  };
  console.log(filterType, filterDate, filterValue);
  const handleDateSelect = (date) => {
    setFilterDate(date);
    applyFilter(date); // Immediately apply filter with the new date
  };

  return (
    <Card className="w-full h-full ">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 pb-4">
        <CardTitle className="text-lg md:text-xl font-bold">
          Borrowers by State
        </CardTitle>
        <div className="flex space-x-2">
          {filterType === "numbers" && (
            <input
              type="text"
              name="firstName"
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                applyFilter(e.target.value);
              }}
              placeholder="Min value"
              className="border rounded px-2 py-1 w-full sm:w-[100px]"
            />
          )}
          {filterType === "date" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                  <CalendarIcon className="w-6 h-6 text-black" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Calendar
                  mode="single"
                  selected={filterDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
          <Select
            onValueChange={(e) => {
              if (e === "all") {
                setFilterDate(null);
                setFilterType(null);
                setData(initialData);
              } else {
                setFilterType(e);
              }
            }}
            value={filterType}
          >
            <SelectTrigger>
              <MoreVertical className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Data</SelectItem>
              <SelectItem value="numbers">By Numbers</SelectItem>
              <SelectItem value="date">By Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col lg:flex-row items-center lg:space-x-8 !pb-0">
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <ChartContainer
            config={chartConfig}
            className="h-[250px] sm:h-[300px] w-full"
          >
            <PieChart className="z-10">
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                strokeWidth={5}
                startAngle={-20}
                endAngle={210}
                innerRadius="88%"
                outerRadius="100%"
                cornerRadius={10}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-4xl font-bold">
                ${totalAmount.toFixed(1)}M
              </span>
              <span className="text-sm text-muted-foreground">
                Total Amount
              </span>
            </div>
          </ChartContainer>
        </div>

        <div className="mt-6 lg:mt-0 w-full lg:w-1/2 space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-bold text-sm sm:text-base">
                  {item.name}
                </span>
              </div>
              <span className="text-gray-500 font-bold text-sm sm:text-base">
                .....................
              </span>
              <span className="font-bold text-sm sm:text-base">
                ${item.value}M
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
