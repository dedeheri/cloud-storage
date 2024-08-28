import { IconSearch } from "@tabler/icons-react";
import React from "react";

const Search = () => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 w-52 md:w-72 flex items-center px-4 space-x-2 rounded-full h-9">
      <div>
        <IconSearch className="text-neutral-400 dark:text-neutral-500 w-5 h-5" />
      </div>
      <input
        className="outline-none bg-transparent w-full placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
        placeholder="Search for documents & files"
      />
    </div>
  );
};

export default Search;
