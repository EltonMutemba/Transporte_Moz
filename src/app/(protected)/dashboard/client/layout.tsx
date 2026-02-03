"use client";

import React from "react";

// Removida a sidebar e o main para evitar duplicação com o layout pai [cite: 2026-01-28]
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}