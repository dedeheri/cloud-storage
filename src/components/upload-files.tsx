import React, { useEffect, useState } from "react";

import { IconUpload } from "@tabler/icons-react";
import UploadPopUp from "./uploads-popup";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { useParams } from "next/navigation";

interface Props {
  setSuccess: (props: boolean) => void;
}

const UploadFiles = ({ setSuccess }: Props) => {
  const [files, setFiles] = useState<any>([]);

  const [successUpload, setSuccessUpload] = useState<boolean>(false);
  const [errorUpload, setErroUpload] = useState<any>(false);
  const [progressUpload, setProgressUpload] = useState<boolean>(false);

  const params = useParams();

  const handleFileUpload = async (
    events: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setProgressUpload(true);
      if (events?.target?.files) {
        setFiles(events.target.files);

        const formData = new FormData();
        formData.append("file", events.target.files[0]);

        const response = await axios.post(
          `/api/files?folderId=${params.id}`,
          formData
        );

        toast({
          description: response?.data?.message,
        });
      }
    } catch (error) {
      setSuccess(false);
      setErroUpload(true);
      toast({
        description: (error as any)?.response?.data?.message,
      });
    } finally {
      setSuccessUpload(true);
      setSuccess(true);
      setProgressUpload(false);
    }
  };

  return (
    <>
      {/* pop up upload */}
      <UploadPopUp
        file={files}
        success={successUpload}
        progress={progressUpload}
        failed={errorUpload}
      />

      <Button
        variant="outline"
        className="items-center mr-3 rounded-xl dark:text-white text-black  h-[4rem] lg:h-[4.5rem] w-full md:w-40 border-dashed border flex justify-start dark:border-neutral-500"
      >
        <label htmlFor="upload" className="w-full cursor-pointer">
          <div className="space-y-1 lg:space-y-2">
            <IconUpload className="w-5 h-5" />

            <h1 className="text-md flex justify-start">Uploads</h1>
          </div>
        </label>
      </Button>

      <input type="file" id="upload" hidden onChange={handleFileUpload} />
    </>
  );
};

export default UploadFiles;
