import React, { useState } from "react";
import CameraPage from "./CameraPage";
import SharePage from "./SharePage";
import Dashboard from "./Dashboard";

function TabsContainer({user_id}) {
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
        {activeTab === "camera" && <CameraPage user_id={user_id} />}
        {activeTab === "dashboard" && <Dashboard />}

      </div>
    </div>
  );
}

export default TabsContainer;