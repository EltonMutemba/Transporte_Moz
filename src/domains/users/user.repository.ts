import { prisma } from "@/lib/prisma";

export class UserRepository {
  static async findByPhone(phone: string) {
    return await prisma.user.findUnique({
      where: { phone }
    });
  }

  static async create(data: any) {
    return await prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        password: data.password,
        role: data.role
      }
    });
  }
}