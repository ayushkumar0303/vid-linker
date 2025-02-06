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
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { signOutSuccess } from "../store/store";

function DashSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useLocation();
  console.log(path);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(path.search);
    const urlTab = urlParams.get("tab");
    setTab(urlTab);
  }, [path.search]);
  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/server/user/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
        navigate("/auth");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="border-r border-black min-h-screen rounded-md"
    >
      <Sidebar.Items className="">
        <Sidebar.ItemGroup>
          <Link to="/dashboard">
            <Sidebar.Item href="#" icon={HiChartPie} as={"div"} active={!tab}>
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
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
