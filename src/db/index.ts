import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// CORREÇÃO: Apontando para a pasta 'schema'
import * as schemaUsuarios from './schema/usuarios';
import * as schemaTurmas from './schema/turmas';
import * as schemaAlunos from './schema/alunos';
import * as schemaMetricas from './schema/metricas';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não encontrada no .env');
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { 
  schema: { 
    ...schemaUsuarios, 
    ...schemaTurmas, 
    ...schemaAlunos, 
    ...schemaMetricas 
  } 
});