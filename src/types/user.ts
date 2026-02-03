export interface RegisterInput {
    name: string;
    phone: string;
    email?: string | null;
    password: string;
    role?: string;
  }