import { NextResponse } from "next/server";
import { db } from "../../../../lib/db.prisma";

const response = (message: string, status: number, error?: any) => {
  return NextResponse.json({ message, error }, { status });
};

export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId") as string;
    const type = searchParams.get("type") as string;

    // find files
    const findFiles = await db.files.findUnique({
      where: { id: fileId },
    });

    const findFolders = await db.folders.findUnique({
      where: { id: fileId },
    });

    if (!findFiles && !findFolders) {
      return response("File not found", 404);
    } else if (type === "folders") {
      await db.folders.update({
        where: { id: fileId },
        data: { starred: findFolders?.starred ? false : true },
      });
    } else {
      await db.files.update({
        where: { id: fileId },
        data: { starred: findFolders?.starred ? false : true },
      });
    }

    return response(`Successfully starred`, 200);
  } catch (error) {
    return response("Something want wrong", 500);
  }
};
