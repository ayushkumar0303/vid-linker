import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiUserGroup,
  HiShoppingBag,
  HiUpload,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { MdRemoveRedEye } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

function DashSidebar() {
  const path = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(path.search);
    const urlTab = urlParams.get("tab");
    setTab(urlTab);
  }, [path.search]);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Sidebar aria-label="Default sidebar example" className="">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard">
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
              as={"div"}
              active={tab === ""}
            >
              Dashboard
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              icon={HiUser}
              label={
                currentUser && currentUser.role === "client"
                  ? "Client"
                  : "Freelancer"
              }
              labelColor="dark"
              as={"div"}
              active={tab === "profile"}
            >
              Profle
            </Sidebar.Item>
          </Link>
          {currentUser && currentUser.role === "freelancer" && (
            <>
              <Link to="/dashboard?tab=clients">
                <Sidebar.Item
                  href="#"
                  icon={HiUserGroup}
                  as={"div"}
                  active={tab === "clients"}
                >
                  Clients
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=video-upload">
                <Sidebar.Item
                  href="#"
                  icon={HiUpload}
                  as={"div"}
                  active={tab === "video-upload"}
                >
                  Upload video
                </Sidebar.Item>
              </Link>
            </>
          )}
          {currentUser && currentUser.role === "client" && (
            <>
              <Link to="/dashboard?tab=freelancers">
                <Sidebar.Item
                  href="#"
                  icon={HiUserGroup}
                  as={"div"}
                  active={tab === "freelancers"}
                >
                  Freelancers
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=review-videos">
                <Sidebar.Item
                  href="#"
                  icon={MdRemoveRedEye}
                  as={"div"}
                  active={tab === "review-videos"}
                >
                  Review videos
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item icon={HiArrowSmRight}>Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
