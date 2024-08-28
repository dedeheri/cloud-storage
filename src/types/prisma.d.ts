import "next-auth";

declare module "next-auth" {
  interface Account {
    email: string | null;
    password: string | null;
  }

  interface User {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
  }

  interface Session {
    user: User;
  }
}
