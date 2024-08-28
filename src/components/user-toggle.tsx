"use client";

import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSession, signOut } from "next-auth/react";
import SwitchModeTheme from "./switch-mode-theme";
import { IconLogout } from "@tabler/icons-react";

interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}

const UserToggle = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | any>();

  useEffect(() => {
    const session = async () => {
      const session = await getSession();
      setLoading(false);
      setUser({ ...session?.user });
    };

    session();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {loading ? (
          <div className="w-8 h-8 md:h-9 md:w-9 animate-pulse rounded-full bg-primary/10" />
        ) : (
          <Avatar className="w-8 h-8 md:h-9 md:w-9">
            <AvatarImage
              src={user?.image}
              alt="@shadcn"
              className="hover:opacity-75 cursor-pointer duration-300"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-72 mr-4 -mt-1 p-0">
        <div className="grid gap-4">
          <div className="">
            {/* user */}
            <div className="flex items-center cursor-pointer group w-full space-x-2 px-4 py-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user?.image}
                  alt="@shadcn"
                  className="group-hover:opacity-75 duration-300 "
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="-space-y-1">
                <h1 className="group-hover:text-gray-600 dark:group-hover:text-gray-300 duration-300 ">
                  {user?.name}
                </h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="border-b" />
            {/* switch */}
            <SwitchModeTheme />

            <div className="border-b" />
            {/* log out */}
            <button
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              className="flex items-center cursor-pointer group w-full space-x-2  px-4 py-3"
            >
              <IconLogout className="w-6 h-6 group-hover:text-gray-600 dark:group-hover:text-gray-300 duration-300" />

              <h1 className="group-hover:text-gray-600 dark:group-hover:text-gray-300 duration-300">
                Log out
              </h1>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserToggle;
