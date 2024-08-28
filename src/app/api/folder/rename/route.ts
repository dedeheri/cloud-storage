import { NextResponse } from "next/server";
import { db } from "../../../../lib/db.prisma";

const response = (message: string, status: number, error?: any) => {
  return NextResponse.json({ message, error }, { status });
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();

    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get("folderId") as string;

    // find folder
    const findFolder = await db.folders.findUnique({
      where: { id: folderId },
    });

    if (!findFolder) {
      return response("Folder not found", 404);
    }

    await db.folders.update({
      where: { id: folderId },
      data: { folderName: body?.folderName },
    });

    return response(`Successfully rename folder`, 200);
  } catch (error) {
    return response(`Something went wrong`, 500);
  }
};
