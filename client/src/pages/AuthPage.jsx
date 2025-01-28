import { Button } from "flowbite-react";
import React from "react";
import { Link, Outlet } from "react-router";

function AuthPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center  gap-2">
      <h1 className="font-semibold text-xl">Who you are?</h1>
      <div className="flex gap-2">
        <Link to="/auth">
          <Button gradientMonochrome="success">Client</Button>
        </Link>
        <Link to="/auth/freelancer">
          <Button gradientMonochrome="success">Freelancer</Button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthPage;
