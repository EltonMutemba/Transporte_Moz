import { Suspense } from "react";
import { userService } from "@/domains/users/user.service";
import ProfileClientContent from "./ProfileClientContent";

/**
 * METADATA: Define o título da página na aba do navegador.
 */
export const metadata = {
  title: "Perfil | TPMOZ",
};

/**
 * SKELETON: Exibido enquanto os dados do utilizador estão a ser carregados.
 * Segue o estilo industrial/brutalista.
 */
export function ProfileSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6 md:p-10">
      <div className="h-20 w-1/2 bg-slate-100 animate-pulse border-b-2 border-slate-200" />
      <div className="h-[450px] w-full bg-slate-50 animate-pulse border-2 border-slate-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

/**
 * PAGE COMPONENT (Server Side)
 * Responsável por buscar os dados no MySQL através do userService.
 */
export default async function PerfilPage() {
  // TREINADOR: No futuro, o "1" será substituído pelo ID da sessão (auth)
  // Certifica-te que tens um utilizador com ID 1 no Prisma Studio.
  const user = await userService.getUserById(1);

  // BARREIRA DE SEGURANÇA: Se o utilizador for null ou undefined, 
  // paramos a execução para evitar erros de runtime no Client Component.
  if (!user) {
    return (
      <main className="p-10 min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-xl w-full p-12 border-4 border-double border-slate-200 text-center">
          <h2 className="text-2xl font-black uppercase text-slate-300 italic tracking-tighter">
            User_Not_Found
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-4 leading-relaxed">
            O registo #0001 não foi localizado no sistema central.<br />
            Verifique a base de dados via Prisma Studio.
          </p>
          <div className="mt-8">
             <span className="text-[9px] bg-slate-100 px-4 py-2 font-black uppercase text-slate-500 border border-slate-200">
               Status: 404_Null_Reference
             </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 md:p-10 min-h-screen bg-white">
      {/* O Suspense garante que o Skeleton aparece se a DB demorar a responder */}
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileClientContent user={user} />
      </Suspense>
    </main>
  );
}