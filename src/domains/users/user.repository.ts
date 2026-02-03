import { prisma } from "@/lib/prisma";

export class UserRepository {
  static async findById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  static async findByPhone(phone: string) {
    return await prisma.user.findUnique({
      where: { phone },
    });
  }

  static async create(data: any) {
    return await prisma.user.create({
      data,
    });
  }

  static async update(id: number, data: { name?: string; phone?: string }) {
    return await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
      },
    });
  }
}