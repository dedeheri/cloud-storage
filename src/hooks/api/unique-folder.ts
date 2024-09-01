import { db } from "@/lib/db.prisma";

const findUniqueFolder = async (id: string) => {
  return await db.folders.findUnique({
    where: { id: id },
  });
};

export default findUniqueFolder;
