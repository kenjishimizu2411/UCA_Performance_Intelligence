import { pgTable, text, timestamp, uuid, integer, decimal } from 'drizzle-orm/pg-core';
import { turmas } from './turmas';

export const alunos = pgTable('tb_alunos', {
  id: uuid('id').defaultRandom().primaryKey(),
  turmaId: uuid('turma_id').references(() => turmas.id).notNull(),
  nome: text('nome').notNull(), // Ex: "ANDRELUIZ.SUP.SHOP"
  email: text('email'), // Opcional, caso queira mandar acesso
  fotoUrl: text('foto_url'), // Para aquele avatar bonito do dashboard
  
  // Notas Finais do Treinamento (Eixo Y do 9-Box)
  notaTecnica: decimal('nota_tecnica', { precision: 4, scale: 2 }), // 0.00 a 10.00
  notaComportamental: decimal('nota_comportamental', { precision: 4, scale: 2 }), // 0.00 a 10.00
  
  // Feedback Texto (Para o relatório final)
  pontosFortes: text('pontos_fortes'), // JSON stringificado ou texto simples
  pontosAtencao: text('pontos_atencao'),
  observacaoFinal: text('observacao_final'), // "O Veredito"

  criadoEm: timestamp('criado_em').defaultNow(),
});