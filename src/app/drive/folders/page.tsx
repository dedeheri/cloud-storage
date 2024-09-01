"use client";

import React, { useEffect, useState } from "react";

import { Container } from "@/components/container";
import axios from "axios";
import ToggleModeDisplay from "@/components/toggle-mode-display";
import { AddFolders } from "@/components/add-folder";
import FilterStarred from "@/components/filter-starred";
import { useSearchParams } from "next/navigation";
import MainContent from "@/components/main-content";

const Page = () => {
  const [folders, setFolders] = useState<any>([]);
  const [pagination, setPagination] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [errorFolder, setErrorFolder] = useState<string>("");

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [modeGridOrList, setModeGridOrList] = useState<string>(
    localStorage.getItem("display-folder") || "list"
  );

  const [fetchAgainAfterAction, setFetchAgainAfterAction] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/folder?page=${currentPage}`);
        setPagination(response?.data?.pagination);
        setFolders(response?.data?.result);
      } catch (error) {
        setErrorFolder((error as any)?.response?.data?.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();

    return () => setFetchAgainAfterAction(false);
  }, [fetchAgainAfterAction, currentPage]);

  return (
    <Container>
      <AddFolders success={setFetchAgainAfterAction} />

      <div className="flex items-center justify-between">
        <FilterStarred />

        <ToggleModeDisplay
          localStorageName={"display-folder"}
          onSet={setModeGridOrList}
          valueSet={modeGridOrList}
        />
      </div>

      <MainContent
        loading={loading}
        data={folders}
        error={errorFolder}
        mode={modeGridOrList}
        fetchingAgain={setFetchAgainAfterAction}
        pagination={pagination}
      />
    </Container>
  );
};

export default Page;
