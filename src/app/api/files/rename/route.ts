import { NextResponse } from "next/server";
import { db } from "../../../../lib/db.prisma";

const response = (message: string, status: number, error?: any) => {
  return NextResponse.json({ message, error }, { status });
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();

    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId") as string;
    const type = searchParams.get("type") as string;

    // find file
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
        data: { folderName: body?.fileName },
      });
    } else {
      await db.files.update({
        where: { id: fileId },
        data: { fileName: body?.fileName },
      });
    }

    return response(`Successfully rename file`, 200);
  } catch (error) {
    return response(`Something went wrong`, 500);
  }
};
