"use client";

import React, { useEffect, useState } from "react";

import { Container } from "@/components/container";
import TableFolder from "@/components/folder/table-folder";
import CardFolder from "@/components/folder/card-folder";
import axios from "axios";
import ToggleModeDisplay from "@/components/toggle-mode-display";
import { AddFolders } from "@/components/add-folder";
import { Skeleton } from "@/components/ui/skeleton";
import FilterStarred from "@/components/filter-starred";

const Page = () => {
  const [folders, setFolders] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorFolder, setErrorFolder] = useState<string>("");

  const [modeGridOrList, setModeGridOrList] = useState<string>(
    localStorage.getItem("display-folder") || "list"
  );

  const [successMoveTrash, setSuccessMoveTrash] = useState<boolean>(false);
  const [successCreateFolder, setSuccessCreateFolder] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/api/folder");
        setFolders(response?.data?.data);
      } catch (error) {
        setErrorFolder((error as any)?.response?.data?.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();

    return () => {
      setSuccessCreateFolder(false);
      setSuccessMoveTrash(false);
    };
  }, [successCreateFolder, successMoveTrash]);

  return (
    <Container>
      <AddFolders success={setSuccessCreateFolder} />

      <div className="flex items-center justify-between">
        <FilterStarred />

        <ToggleModeDisplay
          localStorageName={"display-folder"}
          onSet={setModeGridOrList}
          valueSet={modeGridOrList}
        />
      </div>

      {loading && (
        <div className="space-y-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="w-full h-10" />
          ))}
        </div>
      )}

      {!loading && folders?.length === 0 && (
        <div className="flex justify-center pt-10">
          <h1 className="text-xl">{errorFolder}</h1>
        </div>
      )}

      {!errorFolder && !loading && modeGridOrList === "list" && (
        <TableFolder
          folders={folders}
          setSuccess={setSuccessMoveTrash}
          action="folder"
        />
      )}
      {!loading && modeGridOrList === "grid" && (
        <CardFolder folders={folders} setSuccess={setSuccessMoveTrash} />
      )}
    </Container>
  );
};

export default Page;
