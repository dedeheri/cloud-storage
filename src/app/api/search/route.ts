import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db.prisma";
import authOptions from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const session = async () => await getServerSession(authOptions);

const response = (message: string, status: number, data?: any) => {
  return NextResponse.json(
    {
      message: message,
      data: data,
    },
    { status: status }
  );
};

export const GET = async (req: Request) => {
  try {
    const user = await session();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("q") as string;

    // // find files by id
    const file = await db.files.findMany({
      where: {
        fileOwnerId: user?.user?.id,
        trash: false,
        fileName: { contains: search, mode: "insensitive" },
      },
      include: { folder: true },
    });

    const folder = await db.folders.findMany({
      where: {
        userId: user?.user?.id,
        trash: false,
        folderName: { contains: search, mode: "insensitive" },
      },
      include: { User: true },
    });

    const result = {
      file: file,
      folder: folder,
    };

    // // check files
    // if (files.length === 0) {
    //   return response("The file you upload will be available here", 404);
    // }

    // return all files
    return response("Successfully", 200, result);
  } catch (error) {
    return response("Something went wrong", 500);
  }
};
