import React, { useState } from "react";
import CameraPage from "./CameraPage";
import SharePage from "./SharePage";
import Dashboard from "./Dashboard";

function TabsContainer({ user_id }) {
  const [activeTab, setActiveTab] = useState("camera");

  // Helper for the underline transform
  const getUnderlinePosition = () => {
    switch (activeTab) {
      case "share":
        return "0%";
      case "camera":
        return "100%";
      case "dashboard":
        return "200%";
      default:
        return "0%";
    }
  };

  // Styles
  const styles = {
    container: {
      width: "100%",
      maxWidth: "100%",
      margin: "40px auto",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      overflow: "hidden",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    tabsNavigation: {
      display: "flex",
      position: "relative",
      backgroundColor: "#f9f9f9",
    },
    tab: (isActive) => ({
      flex: 1,
      padding: "14px 0",
      background: "none",
      border: "none",
      fontSize: "16px",
      fontWeight: isActive ? 600 : 500,
      color: isActive ? "#4F46E5" : "#555",
      cursor: "pointer",
      transition: "color 0.3s ease",
    }),
    tabUnderline: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "33.3333%",
      height: "3px",
      backgroundColor: "#4F46E5",
      transform: `translateX(${getUnderlinePosition()})`,
      transition: "transform 0.3s ease",
    },
    tabContent: {
      padding: "24px",
      fontSize: "15px",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabsNavigation}>
        <button
          style={styles.tab(activeTab === "share")}
          onClick={() => setActiveTab("share")}
        >
          Stats
        </button>
        <button
          style={styles.tab(activeTab === "camera")}
          onClick={() => setActiveTab("camera")}
        >
          Camera
        </button>
        <button
          style={styles.tab(activeTab === "dashboard")}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <span style={styles.tabUnderline} />
      </div>

      <div style={styles.tabContent}>
        {activeTab === "share" && <SharePage user_id={user_id} />}
        {activeTab === "camera" && <CameraPage user_id={user_id} />}
        {activeTab === "dashboard" && <Dashboard user_id={user_id} />}
      </div>
    </div>
  );
}

export default TabsContainer;
