import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { MoreVertical, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const initialData = [
  { name: "QLD", value: 18.6, color: "#4285F4", date: "2024-10-15" },
  { name: "SA", value: 3.9, color: "#34A853", date: "2023-02-20" },
  { name: "WA", value: 3.2, color: "#FBBC05", date: "2023-03-10" },
  { name: "VIC", value: 0, color: "#EA4335", date: "2023-04-05" },
];

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

  const handleDateSelect = (date) => {
    setFilterDate(date);
    applyFilter(date);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-bold">
          Borrowers by State
        </CardTitle>
        <div className="flex space-x-2">
          {filterType === "numbers" && (
            <input
              type="text"
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                applyFilter(e.target.value);
              }}
              placeholder="Min value"
              className="border rounded px-2 py-1 w-[100px]"
            />
          )}
          {filterType === "date" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-10 h-10 justify-center items-center text-center font-normal rounded-full !bg-[#f3f4f6]">
                  <CalendarIcon className="w-8 h-8 text-black" />
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
      <CardContent>
        <div className="flex gap-3 mt-10 justify-center items-center lg:items-start lg:flex-row flex-col">
          <div className="relative h-[300px] w-full">
            <ChartContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  startAngle={-20}
                  endAngle={210}
                  innerRadius="88%"
                  outerRadius="100%"
                  cornerRadius={10}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">
                ${totalAmount.toFixed(1)}M
              </span>
              <span className="text-sm text-muted-foreground">
                Total Amount
              </span>
            </div>
          </div>
          <div>
            {data.map((item) => (
              <div
                key={item.name}
                className="flex items-center mt-10 space-x-10"
              >
                <div className="flex items-center">
                  <div
                    className="mr-2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-bold">{item.name}</span>
                </div>
                <span className="text-zinc-500 font-bold text-xl">
                  .....................
                </span>
                <span className="font-bold text-base">${item.value}M</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
