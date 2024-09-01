import { db } from "@/lib/db.prisma";
import authOptions from "@/lib/prisma";
import { getServerSession } from "next-auth";

const session = async () => await getServerSession(authOptions);

export const findManyFiles = async (trash: boolean = false) => {
  const user = await session();

  return await db.files.findMany({
    where: {
      fileOwnerId: user?.user.id,
      trash: trash,
    },
  });
};
