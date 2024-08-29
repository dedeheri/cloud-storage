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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import ActionFiles from "./action-files";
import moment from "moment";
import bytes from "bytes";

interface Props {
  files: any;
  setSuccess: (value: boolean) => void;
  action: string;
}
const TableFile = ({ files, action, setSuccess }: Props) => {
  return (
    <Table className="overflow-x-scroll">
      <TableHeader>
        <TableRow className="whitespace-nowrap ">
          <TableHead className="w-[800px] p-0">Filename</TableHead>

          <TableHead>Location</TableHead>
          <TableHead>File size</TableHead>
          <TableHead>Modified</TableHead>
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full overflow-x-scroll">
        {files?.map((file: any) => (
          <TableRow key={file.id} className="group whitespace-nowrap p-0">
            <TableCell className="font-medium p-0">
              <div className="flex justify-between pr-5">
                <div className="flex items-center space-x-2">
                  {file.fileType === "image/png" && (
                    <IconPhoto className="w-5 h-5" />
                  )}
                  {file.fileType === "folder" && (
                    <IconFolder className="w-5 h-5" />
                  )}
                  {file.fileType === "image/jpeg" && (
                    <IconPhoto className="w-5 h-5" />
                  )}
                  {file.fileType ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                    <IconFileTypeDoc className="w-5 h-5" />
                  )}
                  {file.fileType === "video/x-matroska" && (
                    <IconVideo className="w-5 h-5" />
                  )}

                  <span> {file.fileName}</span>
                </div>

                {file.starred && (
                  <IconStar className="w-5 h-5 dark:text-yellow-600" />
                )}
              </div>
            </TableCell>

            <TableCell>
              {file?.folder?.folderName ? file?.folder?.folderName : "-"}
            </TableCell>
            <TableCell>{file.fileSize ? bytes(file.fileSize) : "-"}</TableCell>
            <TableCell>{moment(file.updatedAt).format("LLL")}</TableCell>
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
  );
};

export default TableFile;
