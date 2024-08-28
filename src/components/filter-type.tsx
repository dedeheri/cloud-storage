import React from "react";
import { Button } from "./ui/button";
import { IconFile } from "@tabler/icons-react";

const FilterType = () => {
  return (
    <Button
      variant="secondary"
      className="rounded-full space-x-2 flex items-center w-32"
    >
      <IconFile className="w-5 h-5" />
      <span>Type</span>
    </Button>
  );
};

export default FilterType;
