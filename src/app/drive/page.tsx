"use client";

import React, { useEffect, useState } from "react";

import { Container } from "@/components/container";
import { IconFile, IconStar } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import UploadFiles from "@/components/upload-files";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ToggleModeDisplay from "@/components/toggle-mode-display";

import TableFile from "@/components/files/table-file";
import CardFile from "@/components/files/card-file";

const Page = () => {
  const [files, setFiles] = useState<any>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(true);
  const [errorFiles, setErrorFiles] = useState<string>("");

  const [modeGridOrList, setModeGridOrList] = useState<string>(
    localStorage?.getItem("display-files") || "list"
  );

  // upload / create
  const [fetchAgainAfterAction, setFetchAgainAfterAction] =
    useState<boolean>(false);

  // fetch files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoadingFiles(true);
        const response = await axios.get("/api/files");
        setFiles(response?.data?.data);
      } catch (error) {
        setErrorFiles((error as any)?.response?.data?.message);
        setLoadingFiles(false);
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchFiles();

    return () => setFetchAgainAfterAction(false);
  }, [fetchAgainAfterAction]);

  return (
    <Container>
      <div className="space-y-8 px-2 ">
        <div className="flex items-center">
          <UploadFiles success={setFetchAgainAfterAction} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2 items-center">
            <Button
              variant="secondary"
              className="rounded-full space-x-2 flex items-center w-32"
            >
              <IconStar className="w-5 h-5" />
              <span>Starred</span>
            </Button>

            <Button
              variant="secondary"
              className="rounded-full space-x-2 flex items-center w-32"
            >
              <IconFile className="w-5 h-5" />
              <span>Type</span>
            </Button>
          </div>

          <ToggleModeDisplay
            localStorageName={"display-files"}
            onSet={setModeGridOrList}
            valueSet={modeGridOrList}
          />
        </div>

        {loadingFiles && (
          <div className="space-y-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="w-full h-10" />
            ))}
          </div>
        )}

        {!loadingFiles && files?.length === 0 && (
          <div className="flex justify-center pt-10">
            <h1 className="text-xl">{errorFiles}</h1>
          </div>
        )}

        {!errorFiles &&
          !loadingFiles &&
          (modeGridOrList === "list" ? (
            <TableFile
              files={files}
              setSuccess={setFetchAgainAfterAction}
              action="files"
            />
          ) : (
            <CardFile
              files={files}
              setSuccess={setFetchAgainAfterAction}
              action="files"
            />
          ))}
      </div>
    </Container>
  );
};

export default Page;
