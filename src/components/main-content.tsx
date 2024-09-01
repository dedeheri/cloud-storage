import React from "react";
import TableFile from "./table-file";
import CardFile from "./card-file";
import PaginationPage from "./pagination-page";
import { Skeleton } from "./ui/skeleton";

interface MainContentProps {
  loading: boolean;
  data: any;
  error: string;
  mode?: string;
  fetchingAgain: (props: boolean) => void;
  pagination: any;
  action?: string;
}

const MainContent = ({
  loading,
  data,
  error,
  mode,
  fetchingAgain,
  pagination,
  action = "files",
}: MainContentProps) => {
  return (
    <div>
      {loading && (
        <div className="space-y-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="w-full h-10" />
          ))}
        </div>
      )}

      {!loading && data?.length === 0 && (
        <div className="flex justify-center pt-10">
          <h1 className="text-xl">{error}</h1>
        </div>
      )}

      {!error &&
        !loading &&
        (mode === "list" ? (
          <TableFile data={data} setSuccess={fetchingAgain} action={action} />
        ) : (
          <CardFile data={data} setSuccess={fetchingAgain} action={action} />
        ))}

      {!error && !loading && pagination?.totalPages > 1 && (
        <PaginationPage pagination={pagination} />
      )}
    </div>
  );
};

export default MainContent;
