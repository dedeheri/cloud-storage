"use client";

import React, { useEffect, useState } from "react";

import { Container } from "@/components/container";
import { IconFile, IconStar } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import UploadFiles from "@/components/upload-files";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ToggleModeDisplay from "@/components/toggle-mode-display";

import TableFile from "@/components/table-file";
import CardFile from "@/components/card-file";
import { AddFolders } from "@/components/add-folder";
import FilterStarred from "@/components/filter-starred";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [data, setData] = useState<any>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(true);
  const [errorFiles, setErrorFiles] = useState<string>("");

  const params = useSearchParams();
  const starred = params.get("starred");

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
        const response = await axios.get(`/api/files?starred=${starred}`);
        setData(response?.data?.data);
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
          <AddFolders success={setFetchAgainAfterAction} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2 items-center">
            <FilterStarred />
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

        {!loadingFiles && data?.length === 0 && (
          <div className="flex justify-center pt-10">
            <h1 className="text-xl">{errorFiles}</h1>
          </div>
        )}

        {!errorFiles &&
          !loadingFiles &&
          (modeGridOrList === "list" ? (
            <TableFile
              data={data}
              setSuccess={setFetchAgainAfterAction}
              action="files"
            />
          ) : (
            <CardFile
              data={data}
              setSuccess={setFetchAgainAfterAction}
              action="files"
            />
          ))}
      </div>
    </Container>
  );
};

export default Page;
