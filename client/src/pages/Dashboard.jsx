import React, { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import { useLocation } from "react-router";
import DashProfile from "../components/DashProfile";
import DashUploadVideo from "../components/DashUploadVideo";
import DashConnectAccount from "../components/DashConnectAccount";

function Dashboard() {
  const path = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(path.search);
    const urlTab = urlParams.get("tab");
    setTab(urlTab);
  }, [path.search]);
  return (
    <div className="flex">
      <div>
        <DashSidebar />
      </div>
      <div>
        {tab === "profile" && <DashProfile />}
        {tab === "video-upload" && <DashUploadVideo />}
        {tab === "add-accounts" && <DashConnectAccount />}
      </div>
    </div>
  );
}

export default Dashboard;
