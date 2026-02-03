import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      {/* O fundo slate-950 aqui garante que a "moldura" da sidebar seja escura por padrão */}
      <body className={`${inter.className} antialiased bg-slate-950`}>
        {children}
      </body>
    </html>
  );
}