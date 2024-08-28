import { db } from "@/lib/db.prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

const response = (message: string, status: number, result?: any) => {
  return NextResponse.json(
    {
      message,
      result,
    },
    { status }
  );
};

export const GET = async (req: Request, { params: { id } }: Params) => {
  try {
    // find files
    const file = await db.files.findMany({
      where: { folderId: id, trash: false },
      include: { folder: true },
    });

    return response("Successfully", 200, file);
  } catch (error) {
    console.log(error);
  }
};
