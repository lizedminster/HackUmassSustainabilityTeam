import React, { useState } from "react";
import CameraPage from "./CameraPage";
import SharePage from "./SharePage";
import Dashboard from "./Dashboard";

function TabsContainer() {
  const [activeTab, setActiveTab] = useState("camera");
  return (
    <div>
      <div className="tabs-navigation">
        <button onClick={() => setActiveTab("share")}>Share</button>
        <button onClick={() => setActiveTab("camera")}>Camera</button>
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>

      </div>
      <div className="tab-content">
        {activeTab === "share" && <SharePage />}
        {activeTab === "camera" && <CameraPage />}
        {activeTab === "dashboard" && <Dashboard />}

      </div>
    </div>
  );
}

export default TabsContainer;