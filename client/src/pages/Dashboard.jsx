import React, { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import { Outlet, useLocation } from "react-router";
import DashProfile from "../components/DashProfile";
import DashUploadVideo from "../components/freelancer/DashUploadVideo";
import DashReviewVideos from "../components/clients/DashReviewVideos";
import { useSelector } from "react-redux";
import DashFreelancerList from "../components/clients/DashFreelancerList";
import DashClientsList from "../components/freelancer/DashClientsList";
import FreelancerDashComponent from "../components/freelancer/FreelancerDashComponent";
import ClientDashComponent from "../components/clients/ClientDashComponent";

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
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
      <div className="flex flex-col w-full">
        {tab === "profile" && <DashProfile />}
        {currentUser?.role === "freelancer" && (
          <>
            {tab === "video-upload" && <DashUploadVideo />}
            {tab === "clients" && <DashClientsList />}
            {!tab && <FreelancerDashComponent />}
          </>
        )}

        {currentUser?.role === "client" && (
          <>
            {tab === "review-videos" && <DashReviewVideos />}
            {tab === "freelancers" && <DashFreelancerList />}

            {!tab && <ClientDashComponent />}
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
