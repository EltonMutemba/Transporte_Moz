import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  console.log('Iniciando seed de dados genéricos...')

  // 1. ADMIN (Gestor Operacional)
  await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      email: 'admin@email.com',
      username: 'admin_geral',
      phone: '840000001',
      name: 'Administrador do Sistema',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // 2. OWNER (Investidor/Dono - Foco em Relatórios)
  await prisma.user.upsert({
    where: { email: 'owner@email.com' },
    update: {},
    create: {
      email: 'owner@email.com',
      username: 'owner_geral',
      phone: '840000002',
      name: 'Proprietário da Empresa',
      password: hashedPassword,
      role: 'OWNER',
    },
  })

  // 3. STAFF (Bilheteiro/Operacional de Terminal)
  await prisma.user.upsert({
    where: { email: 'staff@email.com' },
    update: {},
    create: {
      email: 'staff@email.com',
      username: 'staff_geral',
      phone: '840000003',
      name: 'Agente de Vendas',
      password: hashedPassword,
      role: 'STAFF',
    },
  })

  // 4. CLIENT (Passageiro)
  await prisma.user.upsert({
    where: { email: 'client@email.com' },
    update: {},
    create: {
      email: 'client@email.com',
      username: 'client_geral',
      phone: '840000004',
      name: 'Cliente Exemplo',
      password: hashedPassword,
      role: 'CLIENT',
    },
  })

  console.log('✅ Seed finalizado: Perfis Admin, Owner, Staff e Client criados.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })