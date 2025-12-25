import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usuarios } from './usuarios';

export const turmas = pgTable('tb_turmas', {
  id: uuid('id').defaultRandom().primaryKey(),
  nome: text('nome').notNull(), // Ex: "Intensivo Shop Nov/25"
  vertical: text('vertical').notNull(), // 'shop', 'pack', 'bimer', 'moda'
  instrutorId: uuid('instrutor_id').references(() => usuarios.id),
  dataInicio: timestamp('data_inicio'),
  dataFim: timestamp('data_fim'),
  status: text('status').default('ativa'), // 'ativa', 'concluida'
});