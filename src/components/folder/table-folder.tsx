import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IconFolder, IconStar } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import bytes from "bytes";
import moment from "moment";
import Link from "next/link";
import ActionFolder from "./action-folder";

interface Props {
  folders: [];
  action: string;
  setSuccess: (value: boolean) => void;
}

const TableFolder = ({ folders, action, setSuccess }: Props) => {
  return (
    <Table className="overflow-x-scroll">
      <TableHeader>
        <TableRow className="whitespace-nowrap">
          <TableHead className="w-[800px]">Folder</TableHead>
          <TableHead>File</TableHead>
          <TableHead>File size</TableHead>
          <TableHead>Modified</TableHead>
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full overflow-x-scroll">
        {folders?.map((folder: any) => (
          <TableRow key={folder.id} className="group whitespace-nowrap">
            <TableCell className="font-medium">
              <div className="flex justify-between space-x-4">
                <Link href={`/drive/folders/${folder.id}`}>
                  <div className="flex items-center space-x-2">
                    <IconFolder className="w-5 h-5" />
                    <span> {folder.folderName}</span>
                  </div>
                </Link>

                {folder.starred && (
                  <IconStar className="w-5 h-5 dark:text-yellow-600" />
                )}
              </div>
            </TableCell>

            <TableCell>{folder.totalFiles ? folder.totalFiles : "-"}</TableCell>
            <TableCell>
              {folder.fileSize ? bytes(folder.fileSize) : "-"}
            </TableCell>
            <TableCell>{moment(folder.updatedAt).format("LLL")}</TableCell>
            <TableCell>
              <ActionFolder
                action={action}
                folderName={folder?.folderName}
                starred={folder?.starred}
                setSuccess={setSuccess}
                id={folder?.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableFolder;
