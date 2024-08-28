import { db } from "../../../../lib/db.prisma";

import { NextResponse } from "next/server";

const response = (message: string, status: number, error?: string) => {
  return NextResponse.json({ message, error }, { status });
};

export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId") as string;

    console.log(fileId);

    // find files
    const findFiles = await db.files.findUnique({
      where: { id: fileId },
    });

    // if file not found
    if (!findFiles) {
      return response("File not found", 404);
    } else {
      await db.files.update({ where: { id: fileId }, data: { trash: true } });
    }

    return response(`Successfully move to trash ${findFiles?.fileName}`, 200);
  } catch (error) {
    return response("Something went wrong", 500);
  }
};
