import React, { useState, useEffect } from "react";
import UsageLineChart from "./Components/UsageLineChart";
import WeeklyBarChart from "./Components/WeeklyBarChart";
import Leaderboard from "./Components/Leaderboard";
import WeekNavigator from "./Components/WeekNavigator";
import "./Dashboard.css";

const Dashboard = () => {
  const USER_ID = 8; // <-- change this to the user you want to filter by

  // Dummy leaderboard data
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
    { username: "Charlie", dataCount: 12, color: "#FFD93D" },
  ];

  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const formatDate = (datetime) => datetime.split("T")[0];

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:8000/recycle_log/");
        const logs = await res.json();

        // Filter by specific user
        const userLogs = logs.filter((log) => log.user_id === USER_ID);

        // --- Bar Chart: group by date and material ---
        const grouped = {};
        userLogs.forEach((log) => {
          if (!log.material_type) return;

          const date = formatDate(log.created_at);
          const typeRaw = log.material_type.trim().toLowerCase();
          const type = typeRaw.charAt(0).toUpperCase() + typeRaw.slice(1);

          if (!grouped[date]) grouped[date] = { date };
          grouped[date][type] = (grouped[date][type] || 0) + 1;
        });
        setBarData(Object.values(grouped));

        // --- Line Chart: total count per day ---
        const lineCounts = {};
        userLogs.forEach((log) => {
          if (!log.material_type) return;
          const date = formatDate(log.created_at);
          lineCounts[date] = (lineCounts[date] || 0) + 1;
        });

        const lineDataArray = Object.keys(lineCounts)
          .sort()
          .map((date) => ({ date, value: lineCounts[date] }));
        setLineData(lineDataArray);
      } catch (err) {
        console.error("Error fetching recycle logs:", err);
      }
    };

    fetchLogs();
  }, []);

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
