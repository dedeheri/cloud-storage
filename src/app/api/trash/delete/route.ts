import deleteFile from "@/hooks/api/delete-file";
import deleteFolder from "@/hooks/api/delete-folder";
import findUniqueFile from "@/hooks/api/unique-file";
import findUniqueFolder from "@/hooks/api/unique-folder";
import cloudinary from "@/lib/cloudinary";

import { NextResponse } from "next/server";

const response = (
  message: string,
  status: number,
  data?: any,
  pagination?: any
) => {
  return NextResponse.json(
    {
      message: message,
      pagination,
      result: data,
    },
    { status: status }
  );
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const trashId = searchParams.get("trashId") as string;
    const type = searchParams.get("type") as string;

    if (type === "folders") {
      const folder = await findUniqueFolder(trashId);
      if (folder) {
        await deleteFolder(trashId);
        return response("Successfully delete folder", 200);
      } else {
        return response("File not found", 404);
      }
    } else {
      const file = await findUniqueFile(trashId);

      if (file) {
        await cloudinary.v2.uploader.destroy(
          file?.fileId as string,
          async (err, res) => {
            console.log(res);
            if (res) {
              await deleteFile(trashId);
            }
          }
        );

        return response("Successfully delete file", 200);
      } else {
        return response("File not found", 404);
      }
    }
  } catch (error) {
    return response("Something want wrong", 500);
  }
};
