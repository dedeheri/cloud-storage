import NextAuth from "next-auth/next";

import authOptions from "@/lib/prisma";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as DELETE, handler as PUT };
