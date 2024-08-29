import { NextResponse } from "next/server";
import { db } from "../../../../lib/db.prisma";

const response = (message: string, status: number, error?: any) => {
  return NextResponse.json({ message, error }, { status });
};

export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId") as string;

    // find folder
    const files = await db.files.findUnique({
      where: { id: fileId },
    });

    if (!files) {
      return response("Folder not found", 404);
    }

    await db.files.update({
      where: { id: fileId },
      data: { starred: files.starred ? false : true },
    });

    return response(`Successfully starred file ${files.fileName}`, 200);
  } catch (error) {
    return response("Something want wrong", 500);
  }
};
