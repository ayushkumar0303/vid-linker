import React from "react";
import { Link } from "react-router";
import { Button } from "flowbite-react";

function Error404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
}

export default Error404;
