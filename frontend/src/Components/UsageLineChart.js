// UsageLineChart.js
import React from "react";
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

const UsageLineChart = ({ data, week }) => {
  const year = new Date().getFullYear();
  const weekDates = getDatesOfWeek(week, year);

  const graphData = weekDates.map((d) => {
    const dateStr = d.toISOString().split("T")[0];
    const found = data.find((item) => item.date === dateStr);
    return {
      date: dateStr,
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      value: found ? found.value : 0,
    };
  });

  return (
    <div>
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
