import { salvarAnalista } from "@/actions/instrutor-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InstrutorPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel do Instrutor</h1>
        <p className="text-muted-foreground">Lançamento de métricas da turma Shop.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novo Registro de Analista</CardTitle>
        </CardHeader>
        <CardContent>
          <form 
            action={async (formData) => {
              "use server"
              await salvarAnalista(formData)
            }} 
            className="space-y-6"
          >
            
            {/* Dados Básicos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Analista (Ex: ROCHA.SUP.SHOP)</Label>
                <Input name="nome" id="nome" required placeholder="NOME.SUP.SHOP" />
              </div>
            </div>

            {/* Dados do Excel (Métricas) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="produtividade">Produtividade</Label>
                <Input name="produtividade" id="produtividade" type="number" required placeholder="Ex: 24" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classificacao">Classificação (%)</Label>
                <Input name="classificacao" id="classificacao" type="number" step="0.01" required placeholder="Ex: 96.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primeiroContato">1º Contato (%)</Label>
                <Input name="primeiroContato" id="primeiroContato" type="number" step="0.01" required placeholder="Ex: 87.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tma">TMA (HH:MM:SS)</Label>
                <Input name="tma" id="tma" type="text" required placeholder="00:45:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="helpDesk">Help Desk (Qtd)</Label>
                <Input name="helpDesk" id="helpDesk" type="number" required placeholder="Ex: 5" />
              </div>
            </div>

            <Button type="submit" className="w-full text-lg font-bold">
              💾 Salvar e Calcular 9-Box
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}