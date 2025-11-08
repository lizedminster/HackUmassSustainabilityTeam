// UsageLineChart.js
import React, { useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Example data: multiple weeks
const allData = [
  { date: "2025-11-01", value: 10 },
  { date: "2025-11-02", value: 15 },
  { date: "2025-11-03", value: 12 },
  { date: "2025-11-04", value: 20 },
  { date: "2025-11-05", value: 18 },
  { date: "2025-11-06", value: 25 },
  { date: "2025-11-07", value: 22 },
  { date: "2025-11-08", value: 19 },
  { date: "2025-11-09", value: 17 },
];

// Helper: get ISO week number
const getWeekNumber = (date) => {
  const d = new Date(date);
  const oneJan = new Date(d.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
};

// Helper: get all 7 dates of a week
const getDatesOfWeek = (weekNumber, year) => {
  const simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  const dayOfWeek = simple.getDay(); // 0 = Sunday
  const weekStart = new Date(simple);
  weekStart.setDate(simple.getDate() - dayOfWeek + 1); // Make Monday start
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    weekDates.push(d);
  }
  return weekDates;
};

const UsageLineChart = ({ data = allData }) => {
  const weeks = Array.from(new Set(data.map((d) => getWeekNumber(d.date)))).sort(
    (a, b) => a - b
  );
  const [currentWeekIndex, setCurrentWeekIndex] = useState(weeks.length - 1);
  const currentWeek = weeks[currentWeekIndex];

  const year = new Date().getFullYear();
  const weekDates = getDatesOfWeek(currentWeek, year);

  const graphData = weekDates.map((d) => {
    const dateStr = d.toISOString().split("T")[0];
    const found = data.find((item) => item.date === dateStr);
    return {
      date: dateStr,
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      value: found ? found.value : 0,
    };
  });

  const handlePrevWeek = () => {
    setCurrentWeekIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextWeek = () => {
    setCurrentWeekIndex((prev) => Math.min(prev + 1, weeks.length - 1));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <button onClick={handlePrevWeek} disabled={currentWeekIndex === 0}>
          &lt; Previous
        </button>
        <span>Week {currentWeek}</span>
        <button onClick={handleNextWeek} disabled={currentWeekIndex === weeks.length - 1}>
          Next &gt;
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageLineChart;
