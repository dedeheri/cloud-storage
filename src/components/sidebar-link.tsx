import React, { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  IconChevronRight,
  IconCloud,
  IconDeviceFloppy,
  IconFolder,
  IconFolderOpen,
  IconPhoto,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import Mation from "./mation";

interface SidebarLinkProps {
  isCollapsed: boolean;
}

const SidebarLink = ({ isCollapsed }: SidebarLinkProps) => {
  const pathName = usePathname();

  const [collapsedFolder, setIsCollapsedFolder] = useState<boolean>(false);
  const [loadingFolder, setIsLoadingFolder] = useState<boolean>(true);
  const [folders, setFolders] = useState<[]>([]);

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        setIsLoadingFolder(true);
        const response = await axios.get("/api/folder");
        setFolders(response?.data?.data);
      } catch (error) {
        setIsLoadingFolder(false);
      } finally {
        setIsLoadingFolder(false);
      }
    };

    collapsedFolder && fetchFolder();
  }, [collapsedFolder]);

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {isCollapsed ? (
          <Mation>
            <div className="flex flex-col gap-3">
              <div className="ml-1 mb-4">
                <IconCloud className="h-7 w-7 dark:text-green-500" />
              </div>

              {/* all file */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/drive"
                    className={cn(
                      buttonVariants({
                        variant: pathName === "/drive" ? "secondary" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      pathName === "/drive"
                        ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    <IconDeviceFloppy className="h-6 w-6" />
                    <span className="sr-only">All File</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  All File
                </TooltipContent>
              </Tooltip>

              {/* photo */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/drive/photo"
                    className={cn(
                      buttonVariants({
                        variant:
                          pathName === "/drive/photo" ? "secondary" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      pathName === "/drive/photo"
                        ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    <IconPhoto className="h-6 w-6" />
                    <span className="sr-only">Photo</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  Photo
                </TooltipContent>
              </Tooltip>

              {/* trash */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/drive/trash"
                    className={cn(
                      buttonVariants({
                        variant:
                          pathName === "/drive/trash" ? "secondary" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      pathName === "/drive/trash"
                        ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    <IconTrash className="h-6 w-6" />
                    <span className="sr-only">Trash</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  Trash
                </TooltipContent>
              </Tooltip>

              {/* seperator */}
              <Separator />

              {/* folder */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/drive/folders"
                    className={cn(
                      buttonVariants({
                        variant:
                          pathName === "/drive/folders" ? "secondary" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      pathName === "/drive/folders"
                        ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    <IconFolder className="h-6 w-6" />
                    <span className="sr-only">Folder</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  Folder
                </TooltipContent>
              </Tooltip>
            </div>
          </Mation>
        ) : (
          <Mation>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2  px-3 mb-4">
                <IconCloud className="h-7 w-7 dark:text-green-500" />
                <span className="text-xl font-medium">Cloud</span>
              </div>

              {/* all file */}
              <Link
                href="/drive"
                className={cn(
                  buttonVariants({
                    variant: pathName === "/drive" ? "secondary" : "ghost",
                    size: "sm",
                  }),
                  pathName === "/drive"
                    ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start"
                    : "justify-start text-muted-foreground"
                )}
              >
                <IconDeviceFloppy className="mr-2 h-6 w-6" />
                <span className="text-sm">All File</span>
              </Link>

              {/* photo */}
              <Link
                href="/drive/photo"
                className={cn(
                  buttonVariants({
                    variant:
                      pathName === "/drive/photo" ? "secondary" : "ghost",
                    size: "sm",
                  }),
                  pathName === "/drive/photo"
                    ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start"
                    : "justify-start text-muted-foreground"
                )}
              >
                <IconPhoto className="mr-2 h-6 w-6" />
                <span className="text-sm">Photo</span>
              </Link>

              {/* trash */}
              <Link
                href="/drive/trash"
                className={cn(
                  buttonVariants({
                    variant:
                      pathName === "/drive/trash" ? "secondary" : "ghost",
                    size: "sm",
                  }),
                  pathName === "/drive/trash"
                    ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start"
                    : "justify-start text-muted-foreground"
                )}
              >
                <IconTrash className="mr-2 h-6 w-6" />
                <span className="text-sm">Trash</span>
              </Link>

              {/* seperator */}
              <Separator />
              {/* folder */}

              <div className="flex flex-col gap-2">
                <div
                  className={`flex justify-between items-center  rounded-md ${
                    pathName === "/drive/folders"
                      ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                      : "hover:dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                  }`}
                >
                  <Link
                    href="/drive/folders"
                    className={cn(
                      buttonVariants({
                        variant:
                          pathName === "/drive/folders" ? "secondary" : "ghost",
                        size: "sm",
                      }),

                      pathName === "/drive/folders"
                        ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start"
                        : "justify-start text-muted-foreground"
                    )}
                  >
                    {collapsedFolder ? (
                      <IconFolderOpen className="mr-2 h-6 w-6" />
                    ) : (
                      <IconFolder className="mr-2 h-6 w-6" />
                    )}

                    <span className="text-sm">Folder</span>
                  </Link>

                  <IconChevronRight
                    onClick={() => setIsCollapsedFolder(!collapsedFolder)}
                    className={`h-5 w-5 mr-2 cursor-pointer duration-300 ${
                      collapsedFolder ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </div>

                {collapsedFolder && (
                  <>
                    {loadingFolder ? (
                      [...Array(5)].map((_, i) => (
                        <Skeleton className="w-full h-8" key={i} />
                      ))
                    ) : (
                      <div className="ml-3 flex flex-col gap-2">
                        {folders?.map((folder: any) => (
                          <Link
                            key={folder?.id}
                            href={`/drive/folders/${folder?.id}`}
                            className={cn(
                              buttonVariants({
                                variant:
                                  pathName === `/drive/folders/${folder?.id}`
                                    ? "secondary"
                                    : "ghost",
                                size: "sm",
                              }),

                              pathName === `/drive/folders/${folder?.id}`
                                ? "dark:bg-muted w-full dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start"
                                : "justify-start text-muted-foreground"
                            )}
                          >
                            <IconFolder className="mr-2 h-6 w-6" />
                            <span className="text-sm">{folder?.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </Mation>
        )}
      </nav>
    </div>
  );
};

export default SidebarLink;
