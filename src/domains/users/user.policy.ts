export type UserRole = 'ADMIN' | 'OWNER' | 'STAFF' | 'CLIENT';

export interface SidebarLink {
  href: string;
  label: string;
}

export class UserPolicy {
  static getMenuLinks(role: UserRole): SidebarLink[] {
    const menus: Record<UserRole, SidebarLink[]> = {
      ADMIN: [
        { href: "/dashboard/admin", label: "Dashboard" },
        { href: "/dashboard/admin/users", label: "Gestão de Usuários" },
        { href: "/dashboard/admin/buses", label: "Frota de Buses" },
        { href: "/dashboard/admin/finance", label: "Controlo Financeiro" },
        { href: "/dashboard/admin/audit", label: "Logs de Auditoria" },
      ],
      OWNER: [
        { href: "/dashboard/owner", label: "Painel Operacional" },
        { href: "/dashboard/owner/performance", label: "Performance da Frota" },
        { href: "/dashboard/owner/finance", label: "Relatórios de Lucro" },
      ],
      STAFF: [
        { href: "/dashboard/staff", label: "Minhas Tarefas" },
        { href: "/dashboard/staff/validation", label: "Validar Bilhetes" },
        { href: "/dashboard/staff/box-close", label: "Fecho de Caixa" },
      ],
      CLIENT: [
        { href: "/dashboard/client/viagens", label: "Minhas Viagens" },
        { href: "/dashboard/client/encomendas", label: "Minhas Encomendas" },
        { href: "/dashboard/client/perfil", label: "Meus Dados" },
      ],
    };

    return menus[role] || menus.CLIENT;
  }

  static canAccessPath(role: UserRole, path: string): boolean {
    const rolePath = role.toLowerCase();
    // Permite acesso à raiz do dashboard e ao caminho específico do role
    return path === "/dashboard" || path.startsWith(`/dashboard/${rolePath}`);
  }
}