"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/container";
import axios from "axios";
import { useParams } from "next/navigation";
import ToggleModeDisplay from "@/components/toggle-mode-display";
import UploadFiles from "@/components/upload-files";
import TableFile from "@/components/table-file";
import CardFile from "@/components/card-file";
import { Skeleton } from "@/components/ui/skeleton";
import FilterStarred from "@/components/filter-starred";
import FilterType from "@/components/filter-type";

const Page = () => {
  const [files, setFiles] = useState<any>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(true);
  const [errorFiles, setErrorFiles] = useState<string>("");

  const [fetchAgainAfterAction, setFetchAgainAfterAction] =
    useState<boolean>(false);

  const [modeGridOrList, setModeGridOrList] = useState<string>(
    localStorage?.getItem("display-files-folder") || "list"
  );

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoadingFiles(true);

        const response = await axios.get(`/api/folder/file/${id}`);
        setFiles(response?.data?.result);
      } catch (error) {
        setLoadingFiles(false);
      } finally {
        setLoadingFiles(false);
      }
    };

    fetch();

    return () => setFetchAgainAfterAction(false);
  }, [fetchAgainAfterAction]);

  return (
    <Container>
      <div className="flex items-center">
        <UploadFiles success={setFetchAgainAfterAction} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <FilterStarred />

          <FilterType />
        </div>

        <ToggleModeDisplay
          localStorageName={"display-files-folder"}
          onSet={setModeGridOrList}
          valueSet={modeGridOrList}
        />
      </div>

      {/* loading */}
      {loadingFiles && (
        <div className="space-y-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="w-full h-10" />
          ))}
        </div>
      )}

      {/* error */}
      {!loadingFiles && files?.length === 0 && (
        <div className="flex justify-center pt-10">
          <h1 className="text-xl">{errorFiles}</h1>
        </div>
      )}

      {!errorFiles &&
        !loadingFiles &&
        (modeGridOrList === "list" ? (
          <TableFile
            data={files}
            setSuccess={setFetchAgainAfterAction}
            action="files"
          />
        ) : (
          <CardFile
            data={files}
            setSuccess={setFetchAgainAfterAction}
            action="files"
          />
        ))}
    </Container>
  );
};

export default Page;
