"use client";

import React, { useEffect, useState } from "react";
import { Container } from "../../../components/container";
import axios from "axios";

import TableFile from "../../../components/files/table-file";
import { Skeleton } from "@/components/ui/skeleton";
import TableFolder from "@/components/folder/table-folder";

const page = () => {
  const [trash, setTrash] = useState<any>([]);
  const [loadingTrash, setLoadingTrash] = useState<boolean>(true);
  const [errorTrash, setErrorTrash] = useState<string>("");

  const [fetchAfterAction, setFetchAfterAction] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTrash(true);
        const response = await axios.get("/api/trash");
        setTrash(response?.data?.data);
      } catch (error) {
        setErrorTrash((error as any)?.response?.data?.message);
        setLoadingTrash(false);
      } finally {
        setLoadingTrash(false);
      }
    };

    fetchData();

    return () => setFetchAfterAction(false);
  }, [fetchAfterAction]);

  return (
    <Container>
      <div className="space-y-10">
        {loadingTrash && (
          <div className="space-y-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="w-full h-10" />
            ))}
          </div>
        )}

        {!loadingTrash && trash?.length !== undefined && (
          <div className="flex justify-center pt-10">
            <h1 className="text-xl">{errorTrash}</h1>
          </div>
        )}

        {!loadingTrash && trash?.files?.length > 0 && (
          <div className="space-y-3">
            <h1 className="text-xl">File</h1>

            <TableFile
              files={trash?.files}
              setSuccess={setFetchAfterAction}
              action={"trash"}
            />
          </div>
        )}

        {!loadingTrash && trash?.folders?.length > 0 && (
          <div className="space-y-3">
            <h1 className="text-xl">Folder</h1>
            <TableFolder
              action={"trash"}
              folders={trash?.folders}
              setSuccess={setFetchAfterAction}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default page;
