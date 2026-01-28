import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trans-Moz - Gestão de Transportadoras",
  description: "Plataforma SaaS para gestão de frotas e bilhética em Moçambique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="antialiased bg-gray-50">
        {/* O conteúdo das páginas (public e dashboard) entra aqui */}
        {children}
      </body>
    </html>
  );
}