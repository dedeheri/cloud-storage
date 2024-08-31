"use client";

import UserToggle from "./user-toggle";
import Search from "./search";

const Navbar = () => {
  return (
    <div className="h-14 border-b flex sticky  w-full dark:bg-black z-40 top-0 items-center justify-between px-5">
      <Search />
      <UserToggle />
    </div>
  );
};

export default Navbar;
