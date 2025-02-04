import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router";
import { SiLinkfire } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../store/store";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  // console.log(currentUser);
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const res = await fetch("/server/user/get-users");
  //       const data = await res.json();
  //       if (res.ok) {
  //         setUser(data.users[0]);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser();
  // }, [currentUser]);
  return (
    <Navbar fluid rounded className="border border-b-gray-700">
      <Navbar.Brand>
        <div className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white ">
          <p className="flex justify-center items-center gap-1">
            Vid
            <span className="text-green-500">
              <SiLinkfire />
            </span>
            Linker
          </p>
        </div>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {currentUser && currentUser._id ? (
          <>
            <Dropdown
              // arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={currentUser.profilePicture}
                  rounded
                >
                  <div className="space-y-1 font-medium dark:text-white">
                    <div className="">
                      {`${currentUser.name.split(" ")[0]} `}
                      <span className="text-xs font-sans text-red-500">
                        ({currentUser.role})
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {`Joined in ${new Date(
                        currentUser.createdAt
                      ).toLocaleString("en-us", {
                        month: "long",
                      })}
                      ${new Date(currentUser.createdAt).getFullYear()}`}
                    </div>
                  </div>
                </Avatar>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to="/dashboard">
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </>
        ) : (
          <Link to="/auth">
            <Button color="success" outline>
              Sign In
            </Button>
          </Link>
        )}
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/pricing">Pricing</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/contact-us">Contact</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
