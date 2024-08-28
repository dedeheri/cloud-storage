import { NextResponse } from "next/server";
import { db } from "../../../../lib/db.prisma";

const response = (message: string, status: number, error?: any) => {
  return NextResponse.json({ message, error }, { status });
};

export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);

    const folderId = searchParams.get("folderId") as string;
    const fileId = searchParams.get("fileId") as string;

    // find file

    const file = await db.files.findUnique({ where: { id: fileId } });

    //   find folder
    const folder = await db.folders.findUnique({
      where: { id: folderId },
    });

    if (file?.folderId === null) {
      const fileSize = folder?.fileSize + file?.fileSize;
      const totalFiles = folder?.totalFiles + 1;

      await db.folders.update({
        where: { id: folderId },
        data: { fileSize, totalFiles },
      });
    } else if (file?.folderId) {
      const fileSize = folder?.fileSize + file?.fileSize;
      const totalFiles = folder?.totalFiles + 1;

      await db.folders.update({
        where: { id: file?.folderId },
        data: { fileSize, totalFiles },
      });

      await db.folders.update({
        where: { id: folderId },
        data: { fileSize, totalFiles },
      });

      //
      // const fileSize = folder?.fileSize + file?.fileSize;
      // const totalFiles = folder?.totalFiles - 1;
      // await db.folders.update({
      //   where: { id: folderId },
      //   data: { fileSize, totalFiles },
      // });
    }

    // update file
    await db.files.update({
      where: { id: fileId },
      data: { folderId: folderId },
    });

    return response(`Successfully move to folder ${folder?.folderName}`, 200);
  } catch (error) {
    console.log(error);
    return response(`Something went wrong`, 500);
  }
};
