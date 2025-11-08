// Leaderboard.js
import React from "react";

// Example leaderboard data
const exampleLeaderboard = [
  { username: "Alice", dataCount: 7, color: "#FF6B6B" },
  { username: "Bob", dataCount: 5, color: "#4ECDC4" },
  { username: "Charlie", dataCount: 9, color: "#FFD93D" },
  { username: "Dana", dataCount: 6, color: "#6A4C93" },
];

const Leaderboard = ({ leaderboardData = exampleLeaderboard }) => {
  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Leaderboard</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {leaderboardData.map((user, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 15px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Profile Circle */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: user.color || "#ccc",
                }}
              ></div>
              {/* Username */}
              <span style={{ fontWeight: 500 }}>{user.username}</span>
            </div>
            {/* Data Count */}
            <span style={{ fontWeight: 600 }}>{user.dataCount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
