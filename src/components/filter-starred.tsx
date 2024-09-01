import React from "react";

import { IconStar } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterStarred = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const starred = searchParams.get("starred");

  const [valueFilter, setValueFilter] = React.useState<string>(starred || "");

  const handleQuery = () => {
    const params = new URLSearchParams(searchParams);
    params.set("starred", starred === "true" ? "false" : "true");
    router.push(`${pathname}?${params.toString()}`);
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
