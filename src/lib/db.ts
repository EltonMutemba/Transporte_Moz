/* D:\Users\steli\Desktop\Transportadoras\transporte-moz\src\lib\db.ts */
import { PrismaClient } from "@prisma/client";

// Impede a criação de múltiplas instâncias do Prisma em desenvolvimento
// Isso evita erros de "Too many connections" no seu MySQL
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;