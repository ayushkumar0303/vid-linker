import { Button, Card, Tabs } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ClientSignin from "./ClientSignin";
import FreelancerSignin from "./FreelancerSignin";
import { Link, Outlet, useLocation } from "react-router";
import FreelancerSignup from "./FreelancerSignup";
import ClientSignup from "./ClientSignup";
import { signInFailure } from "../store/store";
import { useDispatch } from "react-redux";
import { SiLinkfire } from "react-icons/si";

function AuthPage() {
  const path = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const paramsUrl = new URLSearchParams(path.search);
    const paramTab = paramsUrl.get("tab");
    // console.log(tab);
    setTab(paramTab);
    dispatch(signInFailure(null));
  }, [path.search]);

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="max-w-lg min-w-64 w-full bg-green-100 py-6 px-3 rounded-lg shadow-lg border-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 flex gap-2 flex-col md:flex-row justify-center items-center flex-wrap">
          Welcome to the
          <div className="font-semibold flex items-center gap-1">
            Vid
            <span className="text-green-500">
              <SiLinkfire />
            </span>
            Linker
          </div>
        </h2>

        {/* Tabs for Client & Freelancer */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-md pb-2">Want to Use VidLinker as</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link to="/auth?tab=client-signin">
              <button
                className={`py-2 px-4 rounded-full border-2 border-green-500 shadow-md hover:bg-green-200 hover:text-gray-800 ${
                  tab?.includes("client")
                    ? "bg-green-500 text-white hover:bg-green-500 hover:text-white"
                    : ""
                }`}
              >
                Client
              </button>
            </Link>

            <Link to="/auth?tab=freelancer-signin">
              <button
                className={` py-2 px-4 rounded-full border-2 border-green-500  hover:bg-green-200 hover:text-gray-800 shadow-md ${
                  tab?.includes("freelancer")
                    ? "bg-green-500 text-white hover:bg-green-500 hover:text-white"
                    : ""
                }`}
              >
                Freelancer
              </button>
            </Link>
          </div>
        </div>

        {/* Auth Forms */}

        {tab === "client-signin" && <ClientSignin />}
        {tab === "client-signup" && <ClientSignup />}
        {tab === "freelancer-signin" && <FreelancerSignin />}
        {tab === "freelancer-signup" && <FreelancerSignup />}
      </div>
    </div>
  );
}

export default AuthPage;
