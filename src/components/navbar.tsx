"use client";

import { IconCloud } from "@tabler/icons-react";
import UserToggle from "./user-toggle";
import Search from "./search";

const Navbar = () => {
  return (
    <div className="h-14 border-b flex sticky  w-full dark:bg-black z-40 top-0 items-center justify-between px-5">
      {/* icon */}
      <div className="flex md:space-x-5 items-center">
        <div className=" md:flex items-center space-x-2 hidden">
          <IconCloud className="h-7 w-7" />
          <span className="text-xl font-medium">Cloud</span>
        </div>

        <Search />
      </div>
      <UserToggle />
    </div>
  );
};

export default Navbar;
