import { Card } from "@/components/ui/card";
import { IconFileTypeDoc, IconPhoto, IconStar } from "@tabler/icons-react";
import bytes from "bytes";

import ActionFiles from "./action-files";

interface Props {
  files: any;
  action: string;
  setSuccess: (value: boolean) => void;
}

const Cards = ({ files, action, setSuccess }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 xl:gap-5">
      {files?.map((file: any) => (
        <div key={file?.id} className="group">
          <Card className="p-3 w-full h-full  xl:w-full cursor-pointer duration-300 space-y-5">
            {file?.fileType === "image/png" && (
              <img
                className="w-full  h-[12rem] min-h-[6rem]  rounded-md"
                src={file?.fileUrl}
              />
            )}
            {file?.fileType === "image/jpeg" && (
              <img
                className="w-full h-[11rem] min-h-[6rem]  rounded-md"
                src={file?.fileUrl}
              />
            )}
            {file?.fileType !== "image/jpeg" && (
              <img
                className="w-full h-[11rem] min-h-[6rem]  rounded-md"
                src={
                  "https://www.sanima.capital/frontend/img/img_placeholder.png"
                }
              />
            )}

            <div className="group-hover:translate-x-2 duration-150 h-[7rem] flex-col flex justify-between">
              <div className="flex items-center justify-between">
                {/* type  */}
                {file?.fileType === "image/jpeg" && (
                  <IconPhoto className="w-5 h-5 text-neutral-500" />
                )}

                {file.fileType ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                  <IconFileTypeDoc className="w-5 h-5 text-neutral-500" />
                )}

                {/* starred */}
                {file?.starred && (
                  <IconStar className="w-5 h-5 dark:text-yellow-600" />
                )}
              </div>

              {/* filename */}
              <h1 className="text-md leading-5">{file?.fileName}</h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <p className="dark:text-neutral-500 text-sm">
                    {file?.folder?.folderName}
                  </p>
                  <p className="dark:text-neutral-500 text-sm">•</p>

                  <p className="dark:text-neutral-500 text-sm">
                    {bytes(file?.fileSize)}
                  </p>
                </div>

                <ActionFiles
                  data={file}
                  setSuccess={setSuccess}
                  action={action}
                />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Cards;
