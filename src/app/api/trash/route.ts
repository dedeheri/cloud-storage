import { NextResponse } from "next/server";
import { findManyFiles } from "@/hooks/api/find-file";
import { findManyFolders } from "@/hooks/api/find-folder";
import loppingFile from "@/lib/lopping-file";
import loppingFolder from "@/lib/lopping-folder";
import sortByDate from "@/lib/sort-by-date";
import pagination from "@/lib/pagination";

const response = (
  message: string,
  status: number,
  data?: any,
  pagination?: any
) => {
  return NextResponse.json(
    {
      message: message,
      pagination,
      result: data,
    },
    { status: status }
  );
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") as string;

    const file = loppingFile(await findManyFiles(true));
    const folder = loppingFolder(await findManyFolders(true));
    const sort = sortByDate([...file, ...folder]);

    // pagination
    const startIndex = (parseInt(page) - 1) * 12;
    const endIndex = parseInt(page) * 12;
    const paginations = pagination(sort, startIndex, endIndex, page);
    const results = sort.slice(startIndex, endIndex);

    if (sort?.length == 0) {
      return response("The file you trashed will be available here", 404);
    } else {
      return response("Successfully", 200, results, paginations);
    }
  } catch (error) {
    return response("Something went wrong", 500);
  }
};

// restore
