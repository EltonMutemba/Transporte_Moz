"use client";

import React from "react";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* REMOVIDA A SIDEBAR CENTRAL. 
          O conteúdo agora ocupa 100% da largura disponível 
          ao lado da sidebar principal do sistema.
      */}
      <main className="w-full h-full">
        {children}
      </main>
    </div>
  );
}