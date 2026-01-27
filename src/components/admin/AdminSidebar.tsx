/*D:\Users\steli\Desktop\Transportadoras\transporte-moz\src\components\admin*/

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Usuários" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r p-6">
      <h2 className="text-lg font-bold mb-6">Admin</h2>

      <nav className="space-y-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded px-3 py-2 text-sm font-medium ${
              pathname === link.href
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
