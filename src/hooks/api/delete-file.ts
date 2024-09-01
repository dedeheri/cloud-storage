import { db } from "@/lib/db.prisma";

const deleteFile = async (id: string) => {
  return await db.files.delete({
    where: {
      id: id,
    },
  });
};

export default deleteFile;
