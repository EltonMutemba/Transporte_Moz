import { DefaultSession } from "next-auth";

export type Role = "ADMIN" | "CLIENT" | "OWNER" | "STAFF";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    phone?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone: string;
    role: Role;
  }
}