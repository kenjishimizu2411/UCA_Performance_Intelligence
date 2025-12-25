import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usuarios = pgTable('tb_usuarios', {
  id: uuid('id').defaultRandom().primaryKey(),
  nome: text('nome').notNull(),
  email: text('email').notNull().unique(),
  senha: text('senha').notNull(), // Será o hash da senha
  cargo: text('cargo').default('instrutor'), // 'instrutor', 'gerente', 'admin'
  criadoEm: timestamp('criado_em').defaultNow(),
});