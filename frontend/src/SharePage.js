import React, { useEffect, useState } from "react";

function SharePage({ user_id }) {
  const [userLogs, setUserLogs] = useState([]);
  const [user, setUser] = useState(null);
  user_id = parseInt(user_id);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:8000/recycle_log/");
        if (!res.ok) throw new Error("Failed to fetch recycle logs");
        const allLogs = await res.json();

        const filteredLogs = allLogs.filter((log) => log.user_id === user_id);
        setUserLogs(filteredLogs);
      } catch (err) {
        console.error("Error fetching recycle logs:", err);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/users/");
        if (!res.ok) throw new Error("Failed to fetch users");
        const allUsers = await res.json();

        const filteredUser = allUsers.find((u) => u.id === user_id);
        setUser(filteredUser || { username: "Unknown" });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (user_id) {
      fetchUser();
      fetchLogs();
    }
  }, [user_id]);

  // Count materials by type
  const materialCounts = userLogs.reduce((acc, log) => {
    const type = log.material_type || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const topMaterials = Object.entries(materialCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const totalCount = topMaterials.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Recycling Stats!</h1>
        <h3 style={{marginTop: '0px'}}>{user?.username || "Loading..."}</h3>

        <table style={{ marginTop: "00px", borderCollapse: "collapse", marginBottom: "30px" }}>
          <thead>
            <tr>
              <th style={{ border: "2px solid white", padding: "8px" }}>
                Material Type
              </th>
              <th style={{ border: "2px solid white", padding: "8px" }}>
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {topMaterials.map(([type, count]) => (
              <tr key={type}>
                <td style={{ border: "2px solid white", padding: "8px" }}>
                  {type}
                </td>
                <td style={{ border: "2px solid white", padding: "8px" }}>
                  {count}
                </td>
              </tr>
            ))}

            <tr>
              <td style={{ border: "2px solid white", padding: "8px", fontWeight: "bold" }}>
                Total
              </td>
              <td style={{ border: "2px solid white", padding: "8px", fontWeight: "bold", paddingBottom: "5px" }}>
                {totalCount}
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default SharePage;
