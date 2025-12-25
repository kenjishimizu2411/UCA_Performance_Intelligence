export interface MetricasBrutas {
  produtividade: number;      // Quantidade absoluta
  classificacao: number;      // Porcentagem (0 a 100)
  tma: number;                // Em SEGUNDOS (para precisão)
  primeiroContato: number;    // Porcentagem (0 a 100)
  helpDesk: number;           // Quantidade absoluta
}

export interface MetasVerticais {
  produtividade: number;      // Meta mínima (Ex: 20)
  classificacao: number;      // Meta mínima (Ex: 97%)
  tma: number;                // Meta MÁXIMA em segundos (Ex: 2820s = 47min)
  primeiroContato: number;    // Meta mínima (Ex: 87%)
  helpDesk: number;           // Meta MÁXIMA (Ex: 9 chamados)
}

export interface ResultadoCalculo {
  notaFinal: number;          // 0 a 100
  detalhes: {
    scoreProdutividade: number;
    scoreClassificacao: number;
    scoreTma: number;
    scorePrimeiroContato: number;
    scoreHelpDesk: number;
  }
}