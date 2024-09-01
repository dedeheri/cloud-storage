import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  IconFileTypeDoc,
  IconFolder,
  IconPhoto,
  IconStar,
  IconVideo,
} from "@tabler/icons-react";

import ActionFiles from "@/components/action-table-card-file";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import moment from "moment";
import bytes from "bytes";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Mation from "./mation";
import { useState } from "react";

interface Props {
  data: any;
  setSuccess: (value: boolean) => void;
  action: string;
}

const TableFile = ({ data, action, setSuccess }: Props) => {
  return (
    <Mation>
      <ScrollArea className="min-h-[35rem]">
        <Table className="overflow-x-scroll w-full">
          <TableHeader className=" w-full">
            <TableRow className="whitespace-nowrap">
              <TableHead className="w-[1300px] p-0">Name</TableHead>
              <TableHead className="w-[15rem]">Modified</TableHead>
              <TableHead>File size</TableHead>
              <TableHead className="sr-only">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full overflow-x-scroll">
            {data?.map((file: any) => (
              <TableRow
                key={file.id}
                className="group whitespace-nowrap p-0 hover:bg-red-50"
              >
                <TableCell className="font-medium p-0">
                  <div className="flex justify-between pr-5">
                    <div className="flex items-center space-x-2">
                      {file.type === "image/png" && (
                        <IconPhoto className="w-5 h-5" />
                      )}
                      {file.type === "folder" && (
                        <IconFolder className="w-5 h-5" />
                      )}
                      {file.type === "image/jpeg" && (
                        <IconPhoto className="w-5 h-5" />
                      )}
                      {file.type ===
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                        <IconFileTypeDoc className="w-5 h-5" />
                      )}
                      {file.type === "video/x-matroska" && (
                        <IconVideo className="w-5 h-5" />
                      )}
                      {file.type === "folders" && (
                        <IconFolder className="w-5 h-5" />
                      )}

                      {file.type === "folders" ? (
                        <Link href={`/drive/folders/${file?.id}`}>
                          <span> {file?.name}</span>
                        </Link>
                      ) : (
                        <PhotoProvider>
                          <PhotoView src={file?.url}>
                            <span className="cursor-pointer">{file?.name}</span>
                          </PhotoView>
                        </PhotoProvider>
                      )}
                    </div>

                    {file.starred && (
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <IconStar className="w-5 h-5 text-yellow-500 dark:text-yellow-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Starred</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>

                <TableCell>{moment(file?.modified).format("LLL")}</TableCell>
                <TableCell>{file?.size ? bytes(file?.size) : "--"}</TableCell>
                <TableCell>
                  <ActionFiles
                    data={file}
                    setSuccess={setSuccess}
                    action={action}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Mation>
  );
};

export default TableFile;
