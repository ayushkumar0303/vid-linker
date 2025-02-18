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
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { signOutSuccess } from "../store/store";

function DashSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useLocation();
  // console.log(path);
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
      className="border-2 border-y-0 border-green-500 rounded-md lg:min-h-screen"
    >
      <Sidebar.Items className="">
        <Sidebar.ItemGroup className="flex flex-col">
          <Link to="/dashboard">
            <Sidebar.Item icon={HiChartPie} as={"div"} active={!tab}>
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
                  icon={HiUserGroup}
                  as={"div"}
                  active={tab === "clients"}
                >
                  Clients
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=video-upload">
                <Sidebar.Item
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
                  icon={HiUserGroup}
                  as={"div"}
                  active={tab === "freelancers"}
                >
                  Freelancers
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=review-videos">
                <Sidebar.Item
                  icon={MdRemoveRedEye}
                  as={"div"}
                  active={tab === "review-videos"}
                >
                  Review videos
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Link to="/dashboard?tab=videos">
            <Sidebar.Item
              icon={MdOutlineVideoLibrary}
              as={"div"}
              active={tab === "videos"}
            >
              Videos
            </Sidebar.Item>
          </Link>
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
