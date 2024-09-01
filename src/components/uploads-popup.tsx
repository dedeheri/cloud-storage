import React, { useEffect } from "react";
import { Card } from "./ui/card";
import {
  IconCheck,
  IconChevronDown,
  IconLoader2,
  IconX,
} from "@tabler/icons-react";
import { Button } from "./ui/button";

interface Props {
  file: any;
  success: boolean;
  failed: boolean;
  progress: boolean;
}

const UploadPopUp = ({ file, success, failed, progress }: Props) => {
  const [collapsePopup, setCollapsePopup] = React.useState<boolean>(true);
  const [closePopup, setClosePopup] = React.useState<boolean>(false);

  useEffect(() => {
    if (file.length == 1) {
      setClosePopup(true);
    } else {
      setClosePopup(false);
    }
  }, [file]);

  const handleCollapsePopup = () => {
    setCollapsePopup((prev) => !prev);
  };
  const handleClosePopup = () => {
    setClosePopup((prev) => !prev);
  };

  return (
    <div
      className={`bottom-0 right-0 fixed h-full z-40 ease-in-out duration-1000 ${
        closePopup ? "translate-y-0 " : "translate-y-full"
      }`}
    >
      <Card className="absolute right-2 bottom-2 w-[25rem] rounded-2xl">
        <div>
          {/* header */}
          <div className="flex items-center justify-between border-b h-14 bg-neutral-100 dark:bg-neutral-900 rounded-t-2xl p-3">
            <h1 className="font-medium">Uploads</h1>

            <div className="space-x-1">
              <Button
                className="w-8 h-8 p-1"
                variant="ghost"
                onClick={handleCollapsePopup}
              >
                <IconChevronDown />
              </Button>
              <Button
                onClick={handleClosePopup}
                className="w-8 h-8 p-1"
                variant="ghost"
              >
                <IconX />
              </Button>
            </div>
          </div>

          {/* success */}

          {collapsePopup && file[0] && (
            <div className="space-y-3 p-3 relative">
              <div className="flex space-x-2 items-center">
                {progress && (
                  <IconLoader2 className="w-5 h-5 animate-spin duration-1000" />
                )}

                {success && <IconCheck className="w-5 h-5" />}

                {failed && <IconX className="w-5 h-5" />}

                <h1
                  className={`text-sm ${
                    success
                      ? "dark:text-white"
                      : "animate-pulse dark:text-neutral-400"
                  }`}
                >
                  {file[0]?.name}
                </h1>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UploadPopUp;
