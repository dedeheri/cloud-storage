"use client";

import React, { useEffect, useState } from "react";

import { Container } from "@/components/container";
import UploadFiles from "@/components/upload-files";
import axios from "axios";
import ToggleModeDisplay from "@/components/toggle-mode-display";

import { AddFolders } from "@/components/add-folder";
import FilterStarred from "@/components/filter-starred";
import { useSearchParams } from "next/navigation";
import FilterType from "@/components/filter-type";
import MainContent from "@/components/main-content";

const Page = () => {
  const [data, setData] = useState<any>([]);
  const [pagination, setPagination] = useState<any>();
  const [loadingFiles, setLoadingFiles] = useState<boolean>(true);
  const [errorFiles, setErrorFiles] = useState<string>("");

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

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
        const response = await axios.get(`/api/files?page=${currentPage}`);
        setPagination(response?.data?.pagination);
        setData(response?.data?.result);
      } catch (error) {
        setErrorFiles((error as any)?.response?.data?.message);
        setLoadingFiles(false);
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchFiles();

    return () => setFetchAgainAfterAction(false);
  }, [fetchAgainAfterAction, currentPage]);

  return (
    <Container>
      <div className="flex items-center">
        <UploadFiles setSuccess={setFetchAgainAfterAction} />
        <AddFolders success={setFetchAgainAfterAction} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <FilterStarred />
          <FilterType />
        </div>

        <ToggleModeDisplay
          localStorageName={"display-files"}
          onSet={setModeGridOrList}
          valueSet={modeGridOrList}
        />
      </div>

      <MainContent
        loading={loadingFiles}
        data={data}
        error={errorFiles}
        mode={modeGridOrList}
        fetchingAgain={setFetchAgainAfterAction}
        pagination={pagination}
      />
    </Container>
  );
};

export default Page;
