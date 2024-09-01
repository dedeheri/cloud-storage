import { findManyFiles } from "@/hooks/api/find-file";
import { findManyFolders } from "@/hooks/api/find-folder";
import pagination from "@/lib/pagination";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db.prisma";
import loppingFile from "@/lib/lopping-file";
import loppingFolder from "@/lib/lopping-folder";
import authOptions from "@/lib/prisma";
import sortByDate from "@/lib/sort-by-date";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

    const starred = searchParams.get("starred") as string;
    const file = sortByDate(loppingFile(await findManyFiles()));

    const filterImage = file.filter((file: any) => {
      return file.type.includes("image");
    });

    // return json
    if (filterImage?.length === 0) {
      return response("The file you upload will be available here", 404);
    } else {
      return response("Successfully", 200, filterImage);
    }
  } catch (error) {
    return response("Something went wrong", 500);
  }
};
