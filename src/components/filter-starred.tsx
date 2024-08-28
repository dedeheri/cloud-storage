import React from "react";

import { IconStar } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const FilterStarred = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeQueryStarred = searchParams.get("starred");
  const [valueFilter, setValueFilter] = React.useState<string>(
    typeQueryStarred || ""
  );

  let queryParams: any;

  const handleQuery = () => {
    // setValueFilter(filterSelected);
    queryParams = new URLSearchParams(window.location.search);
    queryParams.set("starred", true);
    const path = window.location.pathname + "?" + queryParams.toString();
    router.push(path);
  };

  React.useEffect(() => {
    valueFilter === null && setValueFilter("");
  }, [valueFilter]);

  return (
    <Button
      onClick={handleQuery}
      variant="secondary"
      className={`rounded-full border space-x-2 flex items-center w-32 ${
        valueFilter ? "border-yellow-400" : ""
      }`}
    >
      <IconStar className={`w-5 h-5 ${valueFilter ? "text-yellow-500" : ""}`} />
      <span>Starred</span>
    </Button>
  );
};

export default FilterStarred;
