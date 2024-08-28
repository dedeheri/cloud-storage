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

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    const formData = await req.formData();
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
    const user = await session();

    // find files by id
    const files = await db.files.findMany({
      where: { fileOwnerId: user?.user.id, trash: false },
      include: { folder: true, fileOwner: true },
    });

    // check files
    if (files.length === 0) {
      return response("The file you upload will be available here", 404);
    }

    // return all files
    return response("Successfully", 200, files);
  } catch (error) {
    return response("Something went wrong", 500);
  }
};
