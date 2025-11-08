// WeeklyBarChart.js
import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Helper: get ISO week number
const getWeekNumber = (date) => {
  const d = new Date(date);
  const oneJan = new Date(d.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
};

const WeeklyBarChart = ({ data, week }) => {
  const categories = ["catA", "catB", "catC", "catD", "catE", "catF"];

  // Filter data for the given week
  const weekData = data.filter((d) => getWeekNumber(d.date) === week);

  // Aggregate totals for each category
  const graphData = categories.map((cat) => ({
    category: cat,
    value: weekData.reduce((sum, day) => sum + (day[cat] || 0), 0),
  }));

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={350}>
        <RechartsBarChart
          data={graphData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyBarChart;
