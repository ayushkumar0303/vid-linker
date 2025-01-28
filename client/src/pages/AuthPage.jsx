import { Button } from "flowbite-react";
import React from "react";
import { Link, Outlet } from "react-router";

function AuthPage() {
  return (
    <div>
      <h1>How you want to use this platform?</h1>
      <div className="flex gap-2">
        <Link>
          <Button>Client</Button>
        </Link>
        <Link>
          <Button>Freelancer</Button>
        </Link>

        <Outlet />
      </div>
    </div>
  );
}

export default AuthPage;
