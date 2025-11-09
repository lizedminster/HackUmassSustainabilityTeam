import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#4F46E5", // Biodegradable
  "#F59E0B", // Cardboard
  "#10B981", // Glass
  "#EF4444", // Metal
  "#8B5CF6", // Organic
  "#F472B6", // Paper
  "#14B8A6", // Plastic
  "#6B7280", // Unknown
];

const WeeklyBarChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No data for this week.</p>;

  const allTypes = [
    "Biodegradable",
    "Cardboard",
    "Glass",
    "Metal",
    "Organic",
    "Paper",
    "Plastic",
    "Unknown",
  ];

  const aggregatedData = allTypes.map((type) => {
    let total = 0;
    data.forEach((row) => {
      total += row[type] || 0;
    });
    return { material: type, count: total };
  });

  aggregatedData.sort((a, b) => b.count - a.count);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h3 style={{ marginBottom: "20px", color:"black" }}>Your Waste Materials This Week</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={aggregatedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <XAxis
            dataKey="material"
            interval={0}
            angle={-30}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count">
            {aggregatedData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyBarChart;
