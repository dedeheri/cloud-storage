import { Card } from "@/components/ui/card";
import {
  IconFileTypeDoc,
  IconFolder,
  IconPhoto,
  IconStar,
} from "@tabler/icons-react";
import bytes from "bytes";

import ActionFiles from "./files/action-files";
import Link from "next/link";

import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import Mation from "./mation";

interface Props {
  data: any;
  action: string;
  setSuccess: (value: boolean) => void;
}

const CardFile = ({ data, action, setSuccess }: Props) => {
  return (
    <Mation>
      <ScrollArea className="h-[39rem]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-5 ">
          {data?.map((file: any) => (
            <div key={file?.id} className="group duration-300">
              {file?.type === "folders" ? (
                <Card className="bg-neutral-300 dark:bg-neutral-600 relative w-full h-56 md:h-72 flex flex-col justify-end">
                  {/* image */}
                  <IconFolder className="w-36 h-36 md:w-40 md:h-40 mx-auto" />

                  <div className="absolute opacity-0 group-hover:opacity-100 top-2 left-2 bg-white dark:bg-neutral-800  h-9 w-9 rounded-full flex items-center justify-center">
                    {file?.starred ? (
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <IconStar className="w-5 h-5 text-yellow-500 dark:text-yellow-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove from Starred</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <IconStar className="w-5 h-5 text-neutral-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to Starred</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  <div className="absolute opacity-0 group-hover:opacity-100 top-2 right-2  bg-white dark:bg-neutral-800  h-9 w-9 rounded-full flex items-center justify-center pt-2">
                    <ActionFiles
                      data={file}
                      setSuccess={setSuccess}
                      action={action}
                    />
                  </div>
                  {/* background */}
                  <div className="bg-white dark:bg-neutral-800 h-20 rounded-b-lg px-4 py-2">
                    {/* starred */}

                    <Link href={`/drive/folders/${file?.id}`}>
                      <h1 className="text-md truncate mt-2 leading-5 cursor-pointer">
                        {file?.name}
                      </h1>
                    </Link>

                    <div className="flex items-center space-x-1 mt-1">
                      {/* type  */}

                      <p className="text-neutral-500 text-sm">
                        {file?.type ===
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          ? "docx"
                          : file?.type}
                      </p>
                      <p className="text-neutral-500 text-sm">•</p>
                      <p className="text-neutral-500 text-sm">
                        {file?.size ? bytes(file?.size) : "--"}
                      </p>
                    </div>
                  </div>

                  {/* filename */}
                </Card>
              ) : (
                <PhotoProvider>
                  <Card className="bg-neutral-300 dark:bg-neutral-600 relative group  w-full h-56 md:h-72 flex flex-col justify-end">
                    {/* image */}
                    <img
                      src={file?.url}
                      className="h-28 w-32 md:w-52 md:h-40 flex mx-auto rounded-t-lg"
                    />

                    <div className="absolute opacity-0 group-hover:opacity-100 top-2 left-2 bg-white dark:bg-neutral-800  h-9 w-9 rounded-full flex items-center justify-center">
                      {file?.starred ? (
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <IconStar className="w-5 h-5 text-yellow-500 dark:text-yellow-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove from Starred</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <IconStar className="w-5 h-5 text-neutral-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to Starred</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>

                    <div className="absolute opacity-0 group-hover:opacity-100 top-2 right-2 bg-white dark:bg-neutral-800   h-9 w-9 rounded-full flex items-center justify-center pt-2">
                      <ActionFiles
                        data={file}
                        setSuccess={setSuccess}
                        action={action}
                      />
                    </div>

                    {/* background */}
                    <div className="bg-white dark:bg-neutral-800  h-20 rounded-b-lg px-4 py-2">
                      {/* starred */}

                      <PhotoView src={file?.url}>
                        <h1 className="text-md truncate mt-2 leading-5 cursor-pointer">
                          {file?.name}
                        </h1>
                      </PhotoView>

                      <div className="flex items-center space-x-1 mt-1">
                        {/* type  */}

                        <p className="text-neutral-500 text-sm">
                          {file?.type ===
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            ? "docx"
                            : file?.type}
                        </p>
                        <p className="text-neutral-500 text-sm">•</p>
                        <p className="text-neutral-500 text-sm">
                          {file?.size ? bytes(file?.size) : "--"}
                        </p>
                      </div>
                    </div>

                    {/* filename */}
                  </Card>
                </PhotoProvider>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Mation>
  );
};

export default CardFile;
