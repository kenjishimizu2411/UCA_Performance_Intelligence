'use server' // Isso garante que esse código SÓ roda no servidor (segurança)

import { db } from "@/db";
import { alunos, metricasSuporte } from "@/db/schema";
import { calcularNotaPerformance, timeStringToSeconds } from "@/lib/calculos";
import { MetricasBrutas, MetasVerticais } from "@/lib/tipos";
import { revalidatePath } from "next/cache";

// Metas hardcoded do SHOP para este piloto (depois viram tabela no banco)
const METAS_SHOP: MetasVerticais = {
  produtividade: 20,
  classificacao: 97,
  tma: 47 * 60, // 2820s
  primeiroContato: 87,
  helpDesk: 9
};

export async function salvarAnalista(formData: FormData) {
  // 1. Extrair dados do Formulário HTML
  const nome = formData.get('nome') as string;
  const turmaId = "5dee7cfa-993c-4d01-b2fd-e927dda6d161"; // Vamos deixar fixo por enquanto ou criar depois

  // Dados Técnicos (Excel)
  const metricas: MetricasBrutas = {
    produtividade: Number(formData.get('produtividade')),
    classificacao: Number(formData.get('classificacao')),
    tma: timeStringToSeconds(formData.get('tma') as string),
    primeiroContato: Number(formData.get('primeiroContato')),
    helpDesk: Number(formData.get('helpDesk'))
  };

  // 2. Calcular o Score (Eixo X)
  const resultado = calcularNotaPerformance(metricas, METAS_SHOP);

  // 3. Salvar no Banco (Neon) via Drizzle
  try {
    // A. Criar o Aluno (se não existir) - simplificado para o teste
    const [novoAluno] = await db.insert(alunos).values({
      turmaId: turmaId, // Precisamos garantir que existe uma turma antes, mas pro teste vai falhar se não tiver FK.
      // TRUQUE DE MESTRE: Para o MVP, vou comentar a FK de turma no Schema ou criar uma turma dummy antes.
      // Vamos assumir que você vai criar a turma manualmente no banco ou remover a restrição NOT NULL por enquanto.
      nome: nome,
      notaTecnica: "9.0", // Exemplo fixo
      notaComportamental: "9.0", // Exemplo fixo
    }).returning({ id: alunos.id });

    // B. Salvar as Métricas
    await db.insert(metricasSuporte).values({
      alunoId: novoAluno.id,
      tipo: 'final',
      produtividade: metricas.produtividade,
      classificacao: metricas.classificacao.toString(), 
      tma: metricas.tma,
      primeiroContato: metricas.primeiroContato.toString(),
      
      // ERRO ESTAVA AQUI: O nome da coluna no schema é 'chamadosHelpDesk'
      chamadosHelpDesk: metricas.helpDesk, 
      
      encerradosOutros: 0, // Adicionei para garantir, já que definimos no banco
      elogios: 0, // Adicionei para garantir
    });

    console.log(`✅ Analista ${nome} salvo com Score: ${resultado.notaFinal}`);
    
    // Atualiza a tela sem recarregar
    revalidatePath('/instrutor');
    return { success: true, message: 'Analista salvo com sucesso!' };

  } catch (error) {
    console.error("Erro ao salvar:", error);
    return { success: false, message: 'Erro ao salvar no banco.' };
  }
}