import { findManyFiles } from "@/hooks/api/find-file";
import { findManyFolders } from "@/hooks/api/find-folder";
import pagination from "@/lib/pagination";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db.prisma";
import loppingFile from "@/lib/lopping-file";
import loppingFolder from "@/lib/lopping-folder";
import authOptions from "@/lib/prisma";
import sortByDate from "@/lib/sort-by-date";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    const formData = await req.formData();
    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get("folderId") as string;
    const file = formData.get("file") as File;

    const fileBuffer = await file.arrayBuffer();

    const mimeType = file.type;
    const fileName = file.name;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const uploadFile = await cloudinary.v2.uploader.upload(fileUri, {
      use_filename: true,
      resource_type: "auto",
      chunk_size: 6000000,
    });

    const createUploadFile = await db.files.create({
      data: {
        fileId: uploadFile?.public_id,
        fileName: fileName,
        fileType: mimeType,
        fileSize: uploadFile?.bytes,
        fileUrl: uploadFile?.secure_url,
        fileOwnerId: session?.user?.id,
        folderId: folderId === "undefined" ? null : folderId,
      },
    });

    return NextResponse.json(
      {
        message: "Successfully upload files",
        data: createUploadFile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        errorMessage: error,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") as string;
    const starred = searchParams.get("starred") as string;

    const file = loppingFile(await findManyFiles());
    const folder = loppingFolder(await findManyFolders());

    const mergeFileAndFolder = [...file, ...folder];

    const sort = sortByDate(mergeFileAndFolder);

    // pagination
    const startIndex = (parseInt(page) - 1) * 12;
    const endIndex = parseInt(page) * 12;
    const paginations = pagination(sort, startIndex, endIndex, page);
    const res = sort.slice(startIndex, endIndex);

    // return json
    if (mergeFileAndFolder?.length === 0) {
      return response("The file you upload will be available here", 404);
    } else {
      return response("Successfully", 200, res, paginations);
    }
  } catch (error) {
    return response("Something went wrong", 500);
  }
};
