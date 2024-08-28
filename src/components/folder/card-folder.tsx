import React from "react";
import PopperActionFiles from "../popper-action-files";
import { Card } from "../ui/card";
import ActionFolder from "../folder/action-folder";
import { IconFolder, IconStar } from "@tabler/icons-react";
import bytes from "bytes";

interface Props {
  folders: [];
  setSuccess: (props: boolean) => void;
}

const CardFolder = ({ folders, setSuccess }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7  gap-4 xl:gap-5">
      {folders?.map((folder: any) => (
        <div key={folder?.id} className="space-y-4 group">
          <Card className="p-4 h-52 w-full  relative xl:w-full xl:h-52 hover:dark:bg-neutral-700 cursor-pointer duration-300">
            <div className="flex justify-center items-center h-full">
              <IconFolder className="w-32 h-32 md:w-40 md:h-40" />
            </div>

            <div className="absolute top-2 right-2">
              <ActionFolder
                folderName={folder?.folderName}
                id={folder?.id}
                setSuccess={setSuccess}
                starred={folder?.starred}
              />
            </div>
          </Card>

          <div className="space-y-0 flex items-center justify-between pr-3">
            <div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-1">
                  <h1 className="text-md">{folder?.folderName}</h1>
                </div>
              </div>

              <div className="flex space-x-1">
                <p className="dark:text-neutral-500 text-sm">
                  {folder?.totalItem ? folder?.totalItem : "0 Items"}
                </p>
                <p className="dark:text-neutral-500 text-sm">•</p>
                <p className="dark:text-neutral-500 text-sm">
                  {folder?.fileSize ? bytes(folder?.fileSize) : "-"}
                </p>
              </div>
            </div>

            {folder?.starred && (
              <IconStar className="w-5 h-5 dark:text-yellow-600" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardFolder;
