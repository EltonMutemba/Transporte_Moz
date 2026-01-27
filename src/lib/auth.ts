// src/lib/auth.ts
export type Role = "admin" | "dono" | "cobrador" | "cliente";

export type User = {
  username: string;
  role: Role;
};

export const users: (User & { password: string })[] = [
  { username: "admin", password: "123", role: "admin" },
  { username: "dono", password: "123", role: "dono" },
  { username: "cobrador", password: "123", role: "cobrador" },
  { username: "cliente", password: "123", role: "cliente" },
];

export function authenticate(username: string, password: string): User | null {
  const found = users.find((u) => u.username === username && u.password === password);
  return found ? { username: found.username, role: found.role } : null;
}
