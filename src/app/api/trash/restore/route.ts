import findUniqueFile from "@/hooks/api/unique-file";
import findUniqueFolder from "@/hooks/api/unique-folder";
import updateFile from "@/hooks/api/update-file";
import updateFolder from "@/hooks/api/update-folder";
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

export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const trashId = searchParams.get("trashId") as string;
    const type = searchParams.get("type") as string;

    if (type === "folders") {
      const folder = await findUniqueFolder(trashId);
      if (folder) {
        return response("Successfully delete folder", 200);
      } else {
        return response("File not found", 404);
      }
    } else {
      const file = await findUniqueFile(trashId);
      if (file) {
        await updateFile(trashId, { trash: false });
        return response("Successfully restore file", 200);
      } else {
        return response("File not found", 404);
      }
    }
  } catch (error) {
    return response("Something want wrong", 500);
  }
};
