"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconDeviceFloppy,
  IconFolder,
  IconPhoto,
  IconShare,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Navbar from "./navbar";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  const pathName = usePathname();

  const links = [
    {
      label: "All files",
      href: "/drive",
      icon: (
        <IconDeviceFloppy
          className={` dark:text-neutral-200 h-6 w-6 flex-shrink-0 ${
            pathName === "/drive"
              ? "text-neutral-700 dark:text-neutral-100"
              : "text-neutral-400 dark:text-neutral-500"
          }`}
        />
      ),
    },
    {
      label: "Photos",
      href: "/drive/photos",
      icon: (
        <IconPhoto
          className={` dark:text-neutral-200 h-6 w-6 flex-shrink-0 ${
            pathName === "/drive/photos"
              ? "text-neutral-700 dark:text-neutral-100"
              : "text-neutral-400 dark:text-neutral-500"
          }`}
        />
      ),
    },
    {
      label: "Folder",
      href: "/drive/folders",
      icon: (
        <IconFolder
          className={` dark:text-neutral-200 h-6 w-6 flex-shrink-0 ${
            pathName === "/drive/folders"
              ? "text-neutral-700 dark:text-neutral-100"
              : "text-neutral-400 dark:text-neutral-500"
          }`}
        />
      ),
    },

    {
      label: "Trash",
      href: "/drive/trash",
      icon: (
        <IconTrash
          className={` dark:text-neutral-200 h-6 w-6 flex-shrink-0 ${
            pathName === "/drive/trash"
              ? "text-neutral-700 dark:text-neutral-100"
              : "text-neutral-400 dark:text-neutral-500"
          }`}
        />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen relative"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-1">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black overflow-y-scroll h-screen w-full space-y-7">
        <Navbar />
        <div className="p-2 md:px-7 space-y-10">{children}</div>
      </div>
    </div>
  );
}
