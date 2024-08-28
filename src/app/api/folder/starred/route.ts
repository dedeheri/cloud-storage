import { NextResponse } from "next/server";
import { db } from "../../../../lib/db.prisma";

const response = (message: string, status: number, error?: any) => {
  return NextResponse.json({ message, error }, { status });
};

export const PUT = async (req: Request) => {
  try {
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
      data: { starred: findFolder.starred ? false : true },
    });

    return response(
      `Successfully starred folder ${findFolder.folderName}`,
      200
    );
  } catch (error) {
    console.log(error);
  }
};
