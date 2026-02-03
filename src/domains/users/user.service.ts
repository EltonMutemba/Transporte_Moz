import { UserRepository } from "./user.repository";
import { RegisterInput } from "@/types/user"; // Precisas de definir este tipo
import bcrypt from "bcryptjs";

export class UserService {
  static async register(data: RegisterInput) {
    // 1. Sanitização e Validação de Regra de Negócio
    const phone = data.phone.trim();
    
    const existingUser = await UserRepository.findByPhone(phone);
    if (existingUser) {
      throw new Error("Este número de telemóvel já está registado.");
    }

    // 2. Segurança: Encriptação
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Mapeamento Explícito (Não uses ...data por segurança)
    // Isso garante que apenas os campos autorizados cheguem ao repositório
    return await UserRepository.create({
      name: data.name,
      phone: phone,
      email: data.email?.toLowerCase() || null,
      password: hashedPassword,
      role: "CLIENT" // Forçamos o role para evitar que um user se registe como ADMIN
    });
  }
}