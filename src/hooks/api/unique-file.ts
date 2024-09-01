import { db } from "@/lib/db.prisma";

const findUniqueFile = async (id: string) => {
  return await db.files.findUnique({
    where: { id: id },
  });
};

export default findUniqueFile;
