import { UserRepository } from "./user.repository";
import { RegisterInput, UserProfile } from "@/types/user";
import bcrypt from "bcryptjs";

export class UserService {
  async getUserById(id: number): Promise<UserProfile | null> {
    const user = await UserRepository.findById(id);
    if (!user) return null;

    return {
      id: String(user.id),
      name: user.name || "Sem Nome",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role as any,
    };
  }

  async updateUser(id: number, data: { name?: string; phone?: string }) {
    if (data.name && data.name.trim().length < 3) {
      throw new Error("Nome demasiado curto para o sistema.");
    }
    return await UserRepository.update(id, {
      name: data.name?.trim(),
      phone: data.phone?.trim(),
    });
  }

  async register(data: RegisterInput) {
    const phone = data.phone.trim();
    const existingUser = await UserRepository.findByPhone(phone);
    if (existingUser) throw new Error("Telemóvel já registado.");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await UserRepository.create({
      name: data.name,
      phone: phone,
      email: data.email?.toLowerCase() || null,
      password: hashedPassword,
      role: "CLIENT",
    });
  }
}

export const userService = new UserService();