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

const categories = ["Glass", "Paper", "Plastic", "Metal", "Organic", "Cardboard"];

const WeeklyBarChart = ({ data, week }) => {
  // Since Dashboard already filters by week, we can skip filtering here.
  // But we can still aggregate totals across days for the selected week.
  const graphData = categories.map((cat) => ({
    category: cat,
    value: data.reduce((sum, day) => sum + (day[cat] || 0), 0),
  }));

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
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
