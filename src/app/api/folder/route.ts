import { db } from "@/lib/db.prisma";
import authOptions from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const responseJson = (message: string, status: number, result?: any) => {
  return NextResponse.json(
    {
      message: message,
      data: result,
    },
    { status: status }
  );
};

const session = async () => await getServerSession(authOptions);

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
      return responseJson(`Folder ${folderName} is available`, 409);
    }

    // create folder
    await db.folders.create({
      data: {
        folderName,
        userId: session?.user?.id as string,
      },
    });

    return responseJson(`Successfully add Folder ${folderName}`, 200);
  } catch (error) {
    return responseJson("Something went wrong", 500);
  }
};

export const GET = async () => {
  try {
    const user = await session();

    //   if folder empty
    const folderByUser = await db.folders.findMany({
      where: { userId: user?.user?.id, trash: false },
    });

    if (folderByUser.length === 0) return responseJson("Folder is empty", 404);

    return responseJson("Successfully", 200, folderByUser);
  } catch (error) {
    return responseJson("Something went wrong", 500);
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
      return responseJson("Folder not found", 404);
    }

    const result = await db.folders.update({
      where: { id: folderId },
      data: {
        trash: true,
      },
    });

    return responseJson("Successfully move to Trash", 200);
  } catch (error) {
    console.log(error);
  }
};
