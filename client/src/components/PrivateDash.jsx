import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard";
import { Navigate } from "react-router";

function PrivateDash() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Dashboard /> : <Navigate to="/auth" />;
}

export default PrivateDash;
