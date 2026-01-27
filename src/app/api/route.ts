// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { users, User } from "@/lib/auth";

// GET: retorna todos os usuários (exceto senhas)
export async function GET() {
  const publicUsers = users.map(u => ({ username: u.username, role: u.role }));
  return NextResponse.json(publicUsers);
}

// POST: cria um novo usuário
export async function POST(req: NextRequest) {
  const { username, password, role } = await req.json();

  if (!username || !password || !role) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
  }

  const exists = users.find(u => u.username === username);
  if (exists) {
    return NextResponse.json({ error: "Usuário já existe" }, { status: 409 });
  }

  users.push({ username, password, role });
  return NextResponse.json({ message: "Usuário criado com sucesso" });
}

// PUT: atualiza o usuário
export async function PUT(req: NextRequest) {
  const { username, password, role } = await req.json();
  const index = users.findIndex(u => u.username === username);
  if (index === -1) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  users[index] = { username, password, role };
  return NextResponse.json({ message: "Usuário atualizado" });
}

// DELETE: remove o usuário
export async function DELETE(req: NextRequest) {
  const { username } = await req.json();
  const index = users.findIndex(u => u.username === username);
  if (index === -1) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  users.splice(index, 1);
  return NextResponse.json({ message: "Usuário removido" });
}
