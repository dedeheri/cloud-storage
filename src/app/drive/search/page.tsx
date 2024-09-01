"use client";
import React, { useEffect, useState } from "react";

import { Container } from "@/components/container";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

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
    </Container>
  );
};

export default Page;
