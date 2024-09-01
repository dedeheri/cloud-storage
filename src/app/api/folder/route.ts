import { findManyFolders } from "@/hooks/api/find-folder";
import { db } from "@/lib/db.prisma";
import loppingFolder from "@/lib/lopping-folder";
import pagination from "@/lib/pagination";
import authOptions from "@/lib/prisma";
import sortByDate from "@/lib/sort-by-date";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface DataProps {
  id: string;
  name?: string | null;
  type: string | null;
  size: number | null;
  url: string | null;
  starred: boolean | false;
  modified: Date | null;
}

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

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    const body = await req.json();
    const { folderName } = body;

    const fileNameAlReadyExisist = await db.folders.findUnique({
      where: { folderName },
    });

    // check file name already exsits
    if (fileNameAlReadyExisist) {
      return response(`Folder ${folderName} is available`, 409);
    }

    // create folder
    await db.folders.create({
      data: {
        folderName,
        userId: session?.user?.id as string,
      },
    });

    return response(`Successfully add Folder ${folderName}`, 200);
  } catch (error) {
    return response("Something went wrong", 500);
  }
};

export const GET = async (req: Request) => {
  try {
    // query
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") as string;

    const folder = sortByDate(loppingFolder(await findManyFolders()));

    // pagination
    const startIndex = (parseInt(page) - 1) * 10;
    const endIndex = parseInt(page) * 10;
    const paginations = pagination(folder, startIndex, endIndex, page);
    const slice = folder.slice(startIndex, endIndex);

    if (folder?.length === 0) {
      return response("Folder is empty", 404);
    } else {
      return response("Successfully", 200, slice, paginations);
    }
  } catch (error) {
    return response("Something went wrong", 500);
  }
};

export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get("folderId") as string;

    const findFolder = await db.folders.findUnique({
      where: { id: folderId },
    });

    if (!findFolder) {
      return response("Folder not found", 404);
    }

    const result = await db.folders.update({
      where: { id: folderId },
      data: {
        trash: true,
      },
    });

    return response("Successfully move to Trash", 200);
  } catch (error) {
    console.log(error);
  }
};
