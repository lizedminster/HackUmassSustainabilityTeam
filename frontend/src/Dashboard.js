import React, { useState, useEffect } from "react";
import UsageLineChart from "./Components/UsageLineChart";
import WeeklyBarChart from "./Components/WeeklyBarChart";
import Leaderboard from "./Components/Leaderboard";
import WeekNavigator from "./Components/WeekNavigator";
import "./Dashboard.css";

const Dashboard = () => {
  const USER_ID = 8; // Only show data for this user in charts

  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [leaderboardWeekly, setLeaderboardWeekly] = useState([]);
  const [leaderboardAllTime, setLeaderboardAllTime] = useState([]);
  const [logs, setLogs] = useState([]); // store all logs

  const formatDate = (datetime) => datetime.split("T")[0];

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:8000/recycle_log/");
        const data = await res.json();
        setLogs(data); // save all logs

        // Filter logs for this user only for charts
        const userLogs = data.filter((log) => log.user_id === USER_ID);

        // --- Bar chart: group by date and material ---
        const grouped = {};
        userLogs.forEach((log) => {
          if (!log.material_type) return;
          const date = formatDate(log.created_at);
          const type = log.material_type.trim().toLowerCase();
          const key = type.charAt(0).toUpperCase() + type.slice(1);

          if (!grouped[date]) grouped[date] = { date };
          grouped[date][key] = (grouped[date][key] || 0) + 1;
        });
        setBarData(Object.values(grouped));

        // --- Line chart: total count per day ---
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

        // --- All-time leaderboard ---
        const allTimeCounts = {};
        data.forEach((log) => {
          allTimeCounts[log.user_id] = (allTimeCounts[log.user_id] || 0) + 1;
        });
        const allTimeLeaderboard = Object.entries(allTimeCounts)
          .map(([user_id, dataCount]) => ({
            username: `User ${user_id}`,
            dataCount,
            color: "#8884d8", // optional: assign color dynamically if needed
          }))
          .sort((a, b) => b.dataCount - a.dataCount);
        setLeaderboardAllTime(allTimeLeaderboard);

      } catch (err) {
        console.error("Error fetching recycle logs:", err);
      }
    };

    fetchLogs();
  }, [USER_ID]);

  // Recalculate weekly leaderboard whenever selectedWeek changes
  useEffect(() => {
    if (!selectedWeek || logs.length === 0) {
      setLeaderboardWeekly([]);
      return;
    }

    // Filter logs to those in the selected week
    const weekLogs = logs.filter((log) => {
      const date = new Date(formatDate(log.created_at) + "T00:00:00Z");
      const sunday = new Date(selectedWeek + "T00:00:00Z");
      const saturday = new Date(sunday.getTime() + 6 * 24 * 60 * 60 * 1000);
      return date >= sunday && date <= saturday;
    });

    const weekCounts = {};
    weekLogs.forEach((log) => {
      weekCounts[log.user_id] = (weekCounts[log.user_id] || 0) + 1;
    });

    const weeklyLeaderboard = Object.entries(weekCounts)
      .map(([user_id, dataCount]) => ({
        username: `User ${user_id}`,
        dataCount,
        color: "#FF6B6B", // optional
      }))
      .sort((a, b) => b.dataCount - a.dataCount);

    setLeaderboardWeekly(weeklyLeaderboard);
  }, [selectedWeek, logs]);

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
            leaderboardData1={leaderboardWeekly}
            leaderboardData2={leaderboardAllTime}
            title1="Top Users This Week"
            title2="Top Users All-Time"
          />
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
