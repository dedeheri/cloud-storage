import { db } from "@/lib/db.prisma";

const deleteFolder = async (id: string) => {
  return await db.folders.delete({
    where: {
      id: id,
    },
  });
};

export default deleteFolder;
