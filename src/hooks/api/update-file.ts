import { db } from "@/lib/db.prisma";

const updateFile = async (id: string, data: {}) => {
  return await db.files.update({
    where: { id: id },
    data: data,
  });
};

export default updateFile;
