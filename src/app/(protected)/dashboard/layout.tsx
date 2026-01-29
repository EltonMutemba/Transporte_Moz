import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta-moz-2026");

export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) redirect("/login");

  try {
    // Validamos o token uma única vez na raiz
    await jwtVerify(token, SECRET);
    
    return (
      <div className="min-h-screen bg-slate-50">
        {children}
      </div>
    );
  } catch (error) {
    redirect("/login");
  }
}