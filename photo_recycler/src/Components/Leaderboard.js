// Leaderboard.js
import React from "react";

const SingleLeaderboard = ({ title, data }) => (
  <div style={{ width: "100%", maxWidth: "400px" }}>
    <h2 style={{ textAlign: "center", marginBottom: "16px" }}>{title}</h2>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {data.map((user, index) => (
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

const Leaderboard = ({ leaderboardData1, leaderboardData2, title1 = "Leaderboard 1", title2 = "Leaderboard 2" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        gap: "20px",
        flexWrap: "wrap",
        margin: "0 auto",
      }}
    >
      <SingleLeaderboard title={title1} data={leaderboardData1} />
      <SingleLeaderboard title={title2} data={leaderboardData2} />
    </div>
  );
};

export default Leaderboard;
