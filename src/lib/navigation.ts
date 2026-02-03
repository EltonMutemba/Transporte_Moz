import { Role } from "@prisma/client";

// Definimos o tipo exato que o AdminSidebar espera [cite: 2026-01-28]
export type IconKey = 
  | "layout" 
  | "users" 
  | "bus" 
  | "wallet" 
  | "activity" 
  | "ticket" 
  | "check" 
  | "map" 
  | "user" 
  | "settings"; // Adiciona os que o componente suporta

export interface SidebarLink {
  href: string;
  label: string;
  iconKey: IconKey; // Mudamos de string para IconKey [cite: 2026-01-28]
}

export const NAVIGATION_CONFIG: Record<Role, SidebarLink[]> = {
  ADMIN: [
    { href: "/dashboard", label: "Visão Geral", iconKey: "layout" },
    { href: "/dashboard/admin/users", label: "Utilizadores", iconKey: "users" },
    { href: "/dashboard/admin/buses", label: "Frota", iconKey: "bus" },
    { href: "/dashboard/admin/finance", label: "Finanças", iconKey: "wallet" },
  ],
  OWNER: [
    { href: "/dashboard/owner", label: "Desempenho", iconKey: "activity" },
    { href: "/dashboard/owner/finance", label: "Relatórios", iconKey: "wallet" },
  ],
  STAFF: [
    { href: "/dashboard/staff", label: "Bilheteira", iconKey: "ticket" },
    { href: "/dashboard/staff/validation", label: "Check-in", iconKey: "check" },
  ],
  CLIENT: [
    { href: "/dashboard/client/viagens", label: "Minhas Viagens", iconKey: "map" },
    { href: "/dashboard/client/perfil", label: "Meu Perfil", iconKey: "user" },
  ],
};