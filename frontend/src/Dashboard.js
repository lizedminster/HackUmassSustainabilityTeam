import React, { useState, useEffect } from "react";
import UsageLineChart from "./Components/UsageLineChart";
import WeeklyBarChart from "./Components/WeeklyBarChart";
import Leaderboard from "./Components/Leaderboard";
import WeekNavigator from "./Components/WeekNavigator";
import "./Dashboard.css";

const Dashboard = ({user_id}) => {
  const USER_ID = parseInt(user_id); // Only show data for this user in charts
  console.log(user_id);
  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [leaderboardWeekly, setLeaderboardWeekly] = useState([]);
  const [leaderboardAllTime, setLeaderboardAllTime] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]); // 👈 store all users with their hex colors

  const formatDate = (datetime) => datetime.split("T")[0];

  // 🔹 Fetch both users and logs on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logsRes, usersRes] = await Promise.all([
          fetch("http://localhost:8000/recycle_log/"),
          fetch("http://localhost:8000/users/"),
        ]);

        const [logsData, usersData] = await Promise.all([
          logsRes.json(),
          usersRes.json(),
        ]);

        setLogs(logsData);
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // 🔹 Build leaderboards when logs or users change
  useEffect(() => {
    if (logs.length === 0 || users.length === 0) return;

    // --- All-time leaderboard ---
    const allTimeCounts = {};
    logs.forEach((log) => {
      allTimeCounts[log.user_id] = (allTimeCounts[log.user_id] || 0) + 1;
    });

    const allTimeLeaderboard = Object.entries(allTimeCounts)
      .map(([user_id, dataCount]) => {
        const user = users.find((u) => u.id === Number(user_id));
        const color = user?.hexcolor || "#8884d8"; // use user’s saved color
        return {
          username: user ? user.username : `User ${user_id}`,
          dataCount,
          color,
        };
      })
      .sort((a, b) => b.dataCount - a.dataCount);

    setLeaderboardAllTime(allTimeLeaderboard);
  }, [logs, users]);

  // 🔹 Weekly leaderboard & charts update when week changes
  useEffect(() => {
    if (!selectedWeek || logs.length === 0 || users.length === 0) {
      setBarData([]);
      setLineData([]);
      setLeaderboardWeekly([]);
      return;
    }

    const sunday = new Date(selectedWeek + "T00:00:00Z");
    const saturday = new Date(sunday.getTime() + 6 * 24 * 60 * 60 * 1000);

    const weekLogs = logs.filter((log) => {
      const logDate = new Date(formatDate(log.created_at) + "T00:00:00Z");
      return logDate >= sunday && logDate <= saturday;
    });

    // --- Weekly leaderboard ---
    const weekCounts = {};
    weekLogs.forEach((log) => {
      weekCounts[log.user_id] = (weekCounts[log.user_id] || 0) + 1;
    });

    const weeklyLeaderboard = Object.entries(weekCounts)
      .map(([user_id, dataCount]) => {
        const user = users.find((u) => u.id === Number(user_id));
        const color = user?.hexcolor || "#FF6B6B";
        return {
          username: user ? user.username : `User ${user_id}`,
          dataCount,
          color,
        };
      })
      .sort((a, b) => b.dataCount - a.dataCount);

    setLeaderboardWeekly(weeklyLeaderboard);

    // --- User-specific charts ---
    const userLogs = weekLogs.filter((log) => log.user_id === USER_ID);

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
  }, [selectedWeek, logs, users, USER_ID]);

  return (
    <div className="Dashboard">
      <header className="Dashboard-header">
        <h1>Dashboard Page</h1>

        {/* Week Navigator */}
        <div style={{ width: "80%", margin: "20px auto" }}>
          <WeekNavigator
            data={logs.map((log) => ({ date: formatDate(log.created_at) }))}
            onWeekChange={setSelectedWeek}
          />
        </div>

        {/* Line Chart */}
        <div style={{ width: "80%", margin: "20px auto" }}>
          <UsageLineChart data={lineData} week={selectedWeek} />
        </div>

        {/* Bar Chart */}
        <div style={{ width: "80%", margin: "20px auto" }}>
          <WeeklyBarChart data={barData} week={selectedWeek} />
        </div>

        {/* Leaderboards */}
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
