import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router";
import { SiLinkfire } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../store/store";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [path, setPath] = useState("");
  useEffect(() => {
    const pathname = location.pathname;
    setPath(pathname);
  });

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
  //       console.log(error.message);
  //     }
  //   };
  //   getUser();
  // }, [currentUser]);
  return (
    <Navbar fluid rounded className="border-b-2 border-green-500 shadow-md">
      {/* Brand Logo */}
      <Navbar.Brand>
        <div className="text-2xl font-semibold flex items-center gap-1">
          Vid
          <span className="text-green-500">
            <SiLinkfire />
          </span>
          Linker
        </div>
      </Navbar.Brand>

      {/* Right Section */}
      <div className="flex items-center md:order-2">
        {currentUser && currentUser._id ? (
          <>
            {/* User Dropdown */}
            <Dropdown
              inline
              arrowIcon={false}
              label={
                <Avatar img={currentUser.profilePicture} rounded>
                  <div className="space-y-1 font-medium ">
                    <div>{currentUser.name.split(" ")[0]}</div>
                    <div className="text-sm text-gray-500 ">
                      {`Joined in ${new Date(
                        currentUser.createdAt
                      ).toLocaleString("default", {
                        month: "long",
                      })} ${new Date(currentUser.createdAt).getFullYear()}`}
                    </div>
                  </div>
                </Avatar>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium">
                  @{currentUser.username}
                </span>
                <span className="block text-xs text-gray-500">
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
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown>

            {/* Navbar Toggle (Mobile Menu) */}
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

      {/* Navigation Links */}
      <Navbar.Collapse className="md:flex md:space-x-6">
        <Navbar.Link as="div">
          <Link
            to="/"
            className={`hover:text-green-500 transition ${
              path === "/" ? "text-green-500" : ""
            }`}
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link as="div">
          <Link
            to="/about"
            className={`hover:text-green-500 transition ${
              path === "/about" ? "text-green-500" : ""
            }`}
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link as="div">
          <Link
            to="/pricing"
            className={`hover:text-green-500 transition ${
              path === "/pricing" ? "text-green-500" : ""
            }`}
          >
            Pricing
          </Link>
        </Navbar.Link>
        <Navbar.Link as="div">
          <Link
            to="/contact-us"
            className={`hover:text-green-500 transition ${
              path === "/contact-us" ? "text-green-500" : ""
            }`}
          >
            Contact
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
