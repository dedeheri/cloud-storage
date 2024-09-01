import { db } from "@/lib/db.prisma";

const updateFolder = async (id: string, data: {}) => {
  return await db.folders.update({
    where: { id: id },
    data: data,
  });
};

export default updateFolder;
