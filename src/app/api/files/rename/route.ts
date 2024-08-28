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

    // find file
    const file = await db.files.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return response("Folder not found", 404);
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
