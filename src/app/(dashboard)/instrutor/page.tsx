import { salvarAnalista } from "@/actions/instrutor-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InstrutorPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* ... Cabeçalho continua igual ... */}

      <Card>
        <CardHeader>
          <CardTitle>Novo Registro de Analista</CardTitle>
        </CardHeader>
        <CardContent>
          {/* CORREÇÃO AQUI: Envolvemos a server action numa função async simples */}
          <form 
            action={async (formData) => {
              "use server"
              await salvarAnalista(formData)
            }} 
            className="space-y-6"
          >
            
            {/* ... O restante dos inputs continua EXATAMENTE igual ... */}
            
            <div className="grid grid-cols-2 gap-4">
              {/* ... inputs ... */}
            </div>

             {/* ... inputs ... */}

            <Button type="submit" className="w-full text-lg">
              💾 Salvar e Calcular 9-Box
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}