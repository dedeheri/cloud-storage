import { Card } from "@/components/ui/card";
import { IconFolder, IconStar } from "@tabler/icons-react";
import bytes from "bytes";

import ActionFiles from "./action-files";

interface Props {
  files: any;
  action: string;
  setSuccess: (value: boolean) => void;
}

const Cards = ({ files, action, setSuccess }: Props) => {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-7 gap-4 xl:gap-5">
      {files?.map((file: any) => (
        <div key={file?.id} className="space-y-4 group">
          <Card className="p-4 h-52 w-full  relative xl:w-full xl:h-52 hover:dark:bg-neutral-700 cursor-pointer duration-300">
            {file?.fileType === "image/png" && (
              <img
                className="w-full h-full object-contain rounded-md"
                src={file?.fileUrl}
              />
            )}
            {file?.fileType === "image/jpeg" && (
              <img className="w-full h-full  rounded-md" src={file?.fileUrl} />
            )}

            {file?.fileType === "folder" && (
              <div className="flex justify-center items-center h-full">
                <IconFolder className="w-40 h-40" />
              </div>
            )}

            <div className="absolute top-2 right-2">
              <ActionFiles
                data={file}
                setSuccess={setSuccess}
                action={action}
              />
            </div>
          </Card>

          <div className="space-y-0 flex items-center justify-between pr-3">
            <div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-1">
                  <h1 className="text-md">{file?.fileName}</h1>
                </div>
              </div>

              <div className="flex space-x-1">
                <p className="dark:text-neutral-500 text-sm">
                  {file?.fileType ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ? "Docs"
                    : file?.fileType}
                </p>
                <p className="dark:text-neutral-500 text-sm">•</p>
                <p className="dark:text-neutral-500 text-sm">
                  {bytes(file?.fileSize)}
                </p>
              </div>
            </div>

            {file?.starred && (
              <IconStar className="w-5 h-5 dark:text-yellow-600" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
