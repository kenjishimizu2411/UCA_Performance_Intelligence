import { calcularNotaPerformance, timeStringToSeconds } from './src/lib/calculos';
import { MetasVerticais } from './src/lib/tipos';

// 1. Vamos definir as Metas do Shop (Baseado no seu input)
const METAS_SHOP: MetasVerticais = {
  produtividade: 20,
  classificacao: 97, // 97%
  tma: 47 * 60,      // 47 minutos em segundos (2820s)
  primeiroContato: 87, // 87%
  helpDesk: 9
};

// 2. Vamos pegar os dados do "ROCHA" (Seu caso crítico)
// Dados do print: Prod 17, Class 100%, TMA 01:16:10, 1º Cont 82.35%, Help 3
const dadosRocha = {
  produtividade: 17,
  classificacao: 100,
  tma: timeStringToSeconds("01:16:10"), // 4570 segundos
  primeiroContato: 82.35,
  helpDesk: 3 // Ele pediu pouca ajuda (Isso é bom pra métrica isolada, mas ruim no contexto dele, lembra?)
};

console.log("=== TESTE DO ALGORITMO: ROCHA ===");
const resultado = calcularNotaPerformance(dadosRocha, METAS_SHOP);
console.log(resultado);