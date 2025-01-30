import React from "react";
import { Outlet } from "react-router";

function ClientAuth() {
  return (
    <div>
      {" "}
      <div className="flex gap-2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          ut deserunt cum voluptatem facere dolorem rem commodi obcaecati amet
          mollitia, vel asperiores ab, eligendi nulla assumenda, cupiditate
          voluptates tempora facilis!
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default ClientAuth;
