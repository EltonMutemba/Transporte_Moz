import { Role } from "@prisma/client";

export interface SidebarLink {
  href: string;
  label: string;
  iconKey: string;
}

export const NAVIGATION_CONFIG: Record<Role, SidebarLink[]> = {
  ADMIN: [
    { href: "/dashboard/admin", label: "Visão Geral", iconKey: "layout" },
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