import { Button, Card, Tabs } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ClientSignin from "./ClientSignin";
import FreelancerSignin from "./FreelancerSignin";
import { Link, Outlet, useLocation } from "react-router";
import FreelancerSignup from "./FreelancerSignup";
import ClientSignup from "./ClientSignup";

function AuthPage() {
  const path = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const paramsUrl = new URLSearchParams(path.search);
    const paramTab = paramsUrl.get("tab");
    // console.log(tab);
    setTab(paramTab);
  }, [path.search]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white py-6 px-3 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-4">
          Welcome to the Platform
        </h2>

        {/* Tabs for Client & Freelancer */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-md pb-2">Want to Use VidLinker as</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link to="/auth?tab=client-signin">
              <button
                className={`py-2 px-4 rounded-full border-2 border-green-500 shadow-md ${
                  tab?.includes("client") ? "bg-green-500 text-white" : ""
                }`}
              >
                Client
              </button>
            </Link>

            <Link to="/auth?tab=freelancer-signin">
              <button
                className={` py-2 px-4 rounded-full border-2 border-green-500 shadow-md ${
                  tab?.includes("freelancer") ? "bg-green-500 text-white" : ""
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
