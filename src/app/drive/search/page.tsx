"use client";
import React, { useEffect, useState } from "react";

import { Container } from "@/components/container";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import TableFile from "@/components/files/table-file";
import { Skeleton } from "@/components/ui/skeleton";
import TableFolder from "@/components/folder/table-folder";

const Page = () => {
  const params = useSearchParams().get("q");

  const [data, setData] = useState<any>([]);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [errorSearch, setErrorSearch] = useState<string>("");
  const [fetchAgainAfterAction, setFetchAgainAfterAction] =
    useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoadingSearch(true);
        const response = await axios.get(`/api/search?q=${params}`);
        setData(response?.data?.data);
      } catch (error) {
        setLoadingSearch(false);
        console.log(error);
      } finally {
        setLoadingSearch(false);
      }
    };

    fetch();
  }, [params]);

  console.log(data);

  return (
    <Container>
      {loadingSearch && (
        <div className="space-y-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="w-full h-10" />
          ))}
        </div>
      )}

      {/* folder */}

      {!loadingSearch && (
        <div className="space-y-3">
          <h1 className="text-lg md:text-2xl">Folder</h1>
          <TableFolder
            folders={data?.folder}
            setSuccess={setFetchAgainAfterAction}
            action="folder"
          />
        </div>
      )}
      {/* file */}

      {!loadingSearch && (
        <div className="space-y-3">
          <h1 className="text-lg md:text-2xl">File</h1>
          <TableFile
            files={data?.file}
            setSuccess={setFetchAgainAfterAction}
            action="files"
          />
        </div>
      )}
    </Container>
  );
};

export default Page;
