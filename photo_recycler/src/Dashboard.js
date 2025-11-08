// Dashboard.jsx
import React, { useState } from "react";
import UsageLineChart from "./Components/UsageLineChart";
import WeeklyBarChart from "./Components/WeeklyBarChart";
import Leaderboard from "./Components/Leaderboard";
import WeekNavigator from "./Components/WeekNavigator";
import "./Dashboard.css";

const Dashboard = () => {
  // Shared data for line chart
  const lineData = [
    { date: "2025-11-01", value: 10 },
    { date: "2025-11-02", value: 15 },
    { date: "2025-11-03", value: 12 },
    { date: "2025-11-04", value: 20 },
    { date: "2025-11-05", value: 18 },
    { date: "2025-11-06", value: 25 },
    { date: "2025-11-07", value: 22 },
  ];

  // Shared data for bar chart
  const barData = [
    { date: "2025-11-01", catA: 5, catB: 3, catC: 7, catD: 2, catE: 4, catF: 6 },
    { date: "2025-11-02", catA: 3, catB: 6, catC: 2, catD: 5, catE: 1, catF: 3 },
    { date: "2025-11-03", catA: 4, catB: 2, catC: 5, catD: 3, catE: 6, catF: 4 },
    { date: "2025-11-04", catA: 6, catB: 1, catC: 3, catD: 2, catE: 5, catF: 7 },
    { date: "2025-11-05", catA: 2, catB: 4, catC: 6, catD: 3, catE: 2, catF: 5 },
    { date: "2025-11-06", catA: 7, catB: 2, catC: 4, catD: 5, catE: 3, catF: 1 },
  ];

  // Example leaderboard
  const leaderboardData1 = [
    { username: "Alice", dataCount: 7, color: "#FF6B6B" },
    { username: "Bob", dataCount: 5, color: "#4ECDC4" },
    { username: "Charlie", dataCount: 9, color: "#FFD93D" },
    { username: "Dana", dataCount: 6, color: "#6A4C93" },
  ];
    const leaderboardData2 = [
    { username: "Alice", dataCount: 42, color: "#FF6B6B" },
    { username: "Dana", dataCount: 41, color: "#6A4C93" },
    { username: "Bob", dataCount: 31, color: "#4ECDC4" },
    { username: "Charlie", dataCount: 12, color: "#FFD93D"},
  ];

  // Selected week state
  const [selectedWeek, setSelectedWeek] = useState(null);

  return (
    <div className="Dashboard">
      <header className="Dashboard-header">
        <h1>Dashboard Page</h1>

        {/* Week Navigator */}
        <div style={{ width: "80%", margin: "20px auto" }}>
          <WeekNavigator data={lineData} onWeekChange={setSelectedWeek} />
        </div>

        {/* Line Chart */}
        <div style={{ width: "80%", margin: "20px auto" }}>
          {selectedWeek && <UsageLineChart data={lineData} week={selectedWeek} />}
        </div>

        {/* Bar Chart */}
        <div style={{ width: "80%", margin: "20px auto" }}>
          {selectedWeek && <WeeklyBarChart data={barData} week={selectedWeek} />}
        </div>

        {/* Leaderboard */}
        <div style={{ width: "80%", margin: "20px auto" }}>
          <Leaderboard
  leaderboardData1={leaderboardData1}
  leaderboardData2={leaderboardData2}
  title1="Top Users This Week"
  title2="Top Users All-Time"
/>

        </div>
      </header>
    </div>
  );
};

export default Dashboard;
