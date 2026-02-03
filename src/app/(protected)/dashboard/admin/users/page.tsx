import { prisma } from "@/lib/prisma";
import UsersClientContent from "./UsersClientContent";

export default async function UsersAdminPage() {
  // Busca direta no servidor para máxima performance
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <UsersClientContent initialUsers={users} />;
}