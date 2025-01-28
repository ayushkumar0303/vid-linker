import { Button } from "flowbite-react";
import React from "react";
import { Link, Outlet } from "react-router";

function FreelancerAuth() {
  return (
    <div>
      <div className="flex gap-2">
        <Link to="/auth/freelancer">
          <Button gradientMonochrome="success">Sign In</Button>
        </Link>
        <Link to="/auth/freelancer/signup">
          <Button gradientMonochrome="success">Sign Up</Button>
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default FreelancerAuth;
