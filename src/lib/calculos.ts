import { MetricasBrutas, MetasVerticais, ResultadoCalculo } from './tipos';

// PESOS DEFINIDOS (Total = 100%)
const PESOS = {
  produtividade: 0.30,    // 30%
  classificacao: 0.20,    // 20%
  tma: 0.15,              // 15%
  primeiroContato: 0.15,  // 15%
  helpDesk: 0.20          // 20%
};

/**
 * Calcula a nota de performance (Eixo X) baseada nas metas da vertical.
 */
export function calcularNotaPerformance(
  metricas: MetricasBrutas,
  metas: MetasVerticais
): ResultadoCalculo {
  
  // 1. PRODUTIVIDADE (Maior é melhor)
  // Se a meta é 20 e fez 24 -> (24/20)*100 = 120% (Limitamos a 100 ou 110? Vou limitar a 100 para o 9-box não quebrar)
  let scoreProd = (metricas.produtividade / metas.produtividade) * 100;
  scoreProd = Math.min(scoreProd, 100); // Cap em 100%

  // 2. CLASSIFICAÇÃO (Maior é melhor)
  let scoreClass = (metricas.classificacao / metas.classificacao) * 100;
  scoreClass = Math.min(scoreClass, 100);

  // 3. 1º CONTATO (Maior é melhor)
  let scorePrimCont = (metricas.primeiroContato / metas.primeiroContato) * 100;
  scorePrimCont = Math.min(scorePrimCont, 100);

  // 4. TMA (Menor é melhor) - Lógica Inversa
  // Ex: Meta 47min (2820s). Fez 60min (3600s). Score = 2820 / 3600 = 0.78 (78%)
  // Ex: Fez 40min (2400s). Score = 2820 / 2400 = 1.17 (117%) -> Cap 100
  let scoreTma = 0;
  if (metricas.tma > 0) {
    scoreTma = (metas.tma / metricas.tma) * 100;
    scoreTma = Math.min(scoreTma, 100);
  } else {
    scoreTma = 100; // Se TMA for 0 (impossível, mas evita divisão por zero), assume perfeito
  }

  // 5. HELPDESK (Menor é melhor) - Lógica Inversa
  // Ex: Meta 9. Fez 18. Score = 9 / 18 = 0.50 (50%)
  // Ex: Fez 0. Score = 100% (Perfeito)
  let scoreHelp = 0;
  if (metricas.helpDesk === 0) {
    scoreHelp = 100;
  } else {
    // Se fez MENOS que a meta (ex: fez 5, meta 9), é 100%
    if (metricas.helpDesk <= metas.helpDesk) {
      scoreHelp = 100;
    } else {
      scoreHelp = (metas.helpDesk / metricas.helpDesk) * 100;
    }
  }

  // CÁLCULO FINAL PONDERADO
  const notaFinal = 
    (scoreProd * PESOS.produtividade) +
    (scoreClass * PESOS.classificacao) +
    (scorePrimCont * PESOS.primeiroContato) +
    (scoreTma * PESOS.tma) +
    (scoreHelp * PESOS.helpDesk);

  return {
    notaFinal: parseFloat(notaFinal.toFixed(2)), // Arredonda para 2 casas
    detalhes: {
      scoreProdutividade: parseFloat(scoreProd.toFixed(1)),
      scoreClassificacao: parseFloat(scoreClass.toFixed(1)),
      scoreTma: parseFloat(scoreTma.toFixed(1)),
      scorePrimeiroContato: parseFloat(scorePrimCont.toFixed(1)),
      scoreHelpDesk: parseFloat(scoreHelp.toFixed(1))
    }
  };
}

// Helper para converter "HH:MM:SS" do Excel para Segundos
export function timeStringToSeconds(timeString: string): number {
  if(!timeString) return 0;
  const parts = timeString.split(':');
  // Se vier HH:MM:SS
  if (parts.length === 3) {
    return (+parts[0]) * 3600 + (+parts[1]) * 60 + (+parts[2]);
  }
  return 0;
}