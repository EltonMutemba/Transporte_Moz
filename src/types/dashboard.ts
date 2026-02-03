export interface SidebarItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }
  
  export interface UserSession {
    id: string;
    role: 'ADMIN' | 'OWNER' | 'STAFF' | 'CLIENT';
    name: string;
  }