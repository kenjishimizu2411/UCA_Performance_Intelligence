import { pgTable, text, timestamp, uuid, integer, decimal } from 'drizzle-orm/pg-core';
import { alunos } from './alunos';

export const metricasSuporte = pgTable('tb_metricas_suporte', {
  id: uuid('id').defaultRandom().primaryKey(),
  alunoId: uuid('aluno_id').references(() => alunos.id).notNull(),
  
  // Período da métrica (Pode ser semanal ou final)
  dataRegistro: timestamp('data_registro').defaultNow(),
  tipo: text('tipo').default('final'), // 'semanal' ou 'final'

  // Dados Brutos (Exatamente como vem do Excel)
  produtividade: integer('produtividade').notNull().default(0), // Peso 30%
  classificacao: decimal('classificacao', { precision: 5, scale: 2 }).notNull().default('0'), // Peso 20%
  
  // T.M.A em SEGUNDOS (Sempre salve tempo como inteiro no banco para facilitar cálculo)
  tma: integer('tma_segundos').notNull().default(0), // Peso 15%
  tmr: integer('tmr_segundos').notNull().default(0), // Apenas informativo
  
  primeiroContato: decimal('primeiro_contato', { precision: 5, scale: 2 }).default('0'), // Peso 15%
  elogios: integer('elogios').default(0),
  chamadosHelpDesk: integer('chamados_help_desk').default(0), // Peso 20%
  encerradosOutros: integer('encerrados_outros').default(0),
});