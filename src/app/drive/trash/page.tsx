"use client";

import React, { useEffect, useState } from "react";
import { Container } from "../../../components/container";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import MainContent from "@/components/main-content";
import ToggleModeDisplay from "@/components/toggle-mode-display";

const Page = () => {
  const [trash, setTrash] = useState<any>([]);
  const [pagination, setPagination] = useState<any>();
  const [loadingTrash, setLoadingTrash] = useState<boolean>(true);
  const [errorTrash, setErrorTrash] = useState<string>("");
  const [fetchAfterAction, setFetchAfterAction] = useState<boolean>(false);

  // mode
  const [modeGridOrList, setModeGridOrList] = useState<string>(
    localStorage.getItem("display-trash") || "list"
  );

  // page
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTrash(true);
        const response = await axios.get(`/api/trash?page=${currentPage}`);
        setPagination(response?.data?.pagination);
        setTrash(response?.data?.result);
      } catch (error) {
        setErrorTrash((error as any)?.response?.data?.message);
        setLoadingTrash(false);
      } finally {
        setLoadingTrash(false);
      }
    };

    fetchData();

    return () => setFetchAfterAction(false);
  }, [fetchAfterAction, currentPage]);

  return (
    <Container>
      <div className="flex items-center justify-end">
        <ToggleModeDisplay
          localStorageName={"display-folder"}
          onSet={setModeGridOrList}
          valueSet={modeGridOrList}
        />
      </div>

      <MainContent
        loading={loadingTrash}
        data={trash}
        error={errorTrash}
        action={"trash"}
        fetchingAgain={setFetchAfterAction}
        pagination={pagination}
        mode={modeGridOrList}
      />
    </Container>
  );
};

export default Page;
