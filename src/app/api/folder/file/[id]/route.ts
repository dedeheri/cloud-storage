import { db } from "@/lib/db.prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

interface DataProps {
  id: string;
  name?: string | null;
  type: string | null;
  size: number | null;
  url: string | null;
  starred: boolean | false;
  modified: Date | null;
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

    const files = await db.files.findMany({
      where: { folderId: id, trash: false },
    });

    const joinFileAndFolder = () => {
      const data: DataProps[] = [];

      files?.map((file) => {
        data.push({
          id: file?.id,
          name: file?.fileName,
          type: file?.fileType,
          size: file?.fileSize,
          url: file?.fileUrl,
          starred: file?.starred,
          modified: file?.createdAt,
        });
      });

      return data.sort((a: any, b: any) => {
        return new Date(b.modified).getTime() - new Date(a.modified).getTime();
      });
    };

    const result = joinFileAndFolder();

    if (result?.length === 0) return response("Folder is empty", 404);
    return response("Successfully", 200, result);
  } catch (error) {
    console.log(error);
  }
};
