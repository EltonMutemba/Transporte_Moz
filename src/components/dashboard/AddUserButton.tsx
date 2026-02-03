"use client";

import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { CreateUserModal } from "./CreateUserModal";

export function AddUserButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-4 bg-slate-950 text-white rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/10"
      >
        <UserPlus size={18} /> Novo Registo
      </button>

      <CreateUserModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}