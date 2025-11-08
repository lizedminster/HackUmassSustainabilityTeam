import React from 'react';
import UsageLineChart from './Components/UsageLineChart';
import Leaderboard from './Components/Leaderboard';
import './Dashboard.css';

function Dashboard() {
  // Example data: you could also import this from your UsageLineChart or backend
  const leaderboardData = [
    { username: 'Alice', dataCount: 7, color: '#FF6B6B' },
    { username: 'Bob', dataCount: 5, color: '#4ECDC4' },
    { username: 'Charlie', dataCount: 9, color: '#FFD93D' },
    { username: 'Dana', dataCount: 6, color: '#6A4C93' },
  ];

  return (
    <div className="Dashboard">
      <header className="Dashboard-header">
        <p>Dashboard Page</p>
        <div style={{ marginBottom: '30px' }}>
          <UsageLineChart />
        </div>
        <div>
          <Leaderboard leaderboardData={leaderboardData} />
        </div>
      </header>
    </div>
  );
}

export default Dashboard;
