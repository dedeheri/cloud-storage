import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../../lib/prisma";
import { db } from "../../../lib/db.prisma";

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

    // find files by user session

    const files = await db.files.findMany({
      where: { fileOwnerId: user?.user?.id, trash: true },
      include: { folder: true, fileOwner: true },
    });

    const folders = await db.folders.findMany({
      where: { userId: user?.user?.id, trash: true },
      include: { User: true },
    });

    if (files.length == 0 && folders.length == 0) {
      return response("File not found", 404);
    }

    return NextResponse.json(
      {
        message: "Successfully",
        data: {
          files: files,
          folders: folders,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};

// restore
export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const trashId = searchParams.get("trashId") as string;
    const typeRestore = searchParams.get("restore") as string;

    if (typeRestore === "folder") {
      const folder = await db.folders.findUnique({
        where: { id: trashId },
      });

      if (folder) {
        await db.folders.update({
          where: { id: trashId },
          data: { trash: false },
        });
        return response("Successfully restore file", 200);
      } else {
        return response("File not found", 404);
      }
    }

    if (typeRestore === "file") {
      const folder = await db.files.findUnique({
        where: { id: trashId },
      });

      if (folder) {
        await db.files.update({
          where: { id: trashId },
          data: { trash: false },
        });
        return response("Successfully restore file", 200);
      } else {
        return response("File not found", 404);
      }
    }
  } catch (error) {
    return response("Something want wrong", 500);
  }
};
