// 1. Definimos o Type exato que o teu Prisma espera
export type UserRole = "ADMIN" | "OWNER" | "STAFF" | "CLIENT";

// 2. A Interface de Perfil (O que a UI consome)
export interface UserProfile {
  id: string; // ID convertido para string para a interface
  name: string | null;
  email: string | null;
  phone: string;
  role: UserRole;
}

// 3. A Interface de Registo (O que o formulário envia)
export interface RegisterInput {
  name: string;
  phone: string;
  email?: string | null;
  password: string;
  role?: UserRole; // Mudamos de string para UserRole para segurança
}