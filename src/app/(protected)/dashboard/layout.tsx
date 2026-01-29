"use client";

import React from "react";

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  // Este layout é a raiz de /dashboard. 
  // Ele não deve ter sidebar fixa para não colidir com os layouts específicos.
  return (
    <div className="min-h-screen bg-slate-50">
      {children}
    </div>
  );
}