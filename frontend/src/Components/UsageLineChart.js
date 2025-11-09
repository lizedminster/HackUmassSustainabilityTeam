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

const UsageLineChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Sunday → Saturday static axis
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const graphData = daysOfWeek.map((dayAbbrev) => {
    const found = data.find((d) => {
      const day = new Date(d.date).toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      });
      return day === dayAbbrev;
    });

    return {
      day: dayAbbrev,
      value: found ? found.value : 0,
    };
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={graphData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Commits Per Day" stroke="#8884d8" strokeWidth={2} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageLineChart;
