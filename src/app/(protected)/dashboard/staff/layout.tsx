"use client";

import React from "react";
import { ScanQrCode, ClipboardList } from "lucide-react";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-amber-50">
      <aside className="w-80 bg-amber-600 text-white p-8">
        <div className="font-black italic text-xl mb-12 uppercase tracking-tighter">Staff Ops</div>
        <nav className="space-y-6 text-[10px] font-black uppercase tracking-widest">
           <div className="flex items-center gap-3"><ScanQrCode size={18}/> Validar Bilhete</div>
           <div className="flex items-center gap-3 opacity-60"><ClipboardList size={18}/> Manifesto</div>
        </nav>
      </aside>
      <main className="flex-1 p-12">{children}</main>
    </div>
  );
}