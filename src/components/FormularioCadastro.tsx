import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, UserCheck, Send, Shield } from "lucide-react";

// Tipos de documento
const tiposDocumento = [
  { value: 0, label: "CPF" },
  { value: 1, label: "SSN" },
  { value: 2, label: "ITIN" },
  { value: 3, label: "PASSAPORTE" }
];

// Países disponíveis
const paises = [
  { value: "BR", label: "Brasil", codigo: "+55", bandeira: "🇧🇷" },
  { value: "US", label: "Estados Unidos", codigo: "+1", bandeira: "🇺🇸" }
];

// Schema de validação
const pessoaSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  telefone: z.string().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),
  codigoPais: z.string().min(1, "Código do país obrigatório"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  tipoDocumento: z.number().min(0).max(3, "Tipo de documento inválido"),
  numeroDocumento: z.string().min(1, "Número do documento obrigatório").max(50, "Número do documento muito longo"),
});

const titularSchema = z.object({
  tipoDocumento: z.number().min(0).max(3, "Tipo de documento inválido"),
  numeroDocumento: z.string().min(1, "Número do documento obrigatório").max(50, "Número do documento muito longo"),
});

const dependenteSchema = pessoaSchema;

const formularioSchema = z.object({
  titular: titularSchema,
  dependentes: z.array(dependenteSchema),
  plano: z.string().optional(),
});

type FormularioData = z.infer<typeof formularioSchema>;

interface FormularioCadastroProps {
  quantidadeDependentes?: number;
  planoNome?: string;
  customerStripe?: string;
  onSubmit?: (data: FormularioData) => void;
}

export const FormularioCadastro = ({
  quantidadeDependentes = 0,
  planoNome,
  customerStripe,
  onSubmit
}: FormularioCadastroProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormularioData>({
    resolver: zodResolver(formularioSchema),
    defaultValues: {
      titular: {
        tipoDocumento: 0, // CPF por padrão
        numeroDocumento: "",
      },
      dependentes: [],
      plano: planoNome || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dependentes",
  });

  // Atualizar dependentes quando a quantidade mudar
  useEffect(() => {
    // Limpar dependentes existentes
    while (fields.length > 0) {
      remove(0);
    }

    // Adicionar novos dependentes baseado na quantidade
    for (let i = 0; i < quantidadeDependentes; i++) {
      append({
        nome: "",
        telefone: "",
        codigoPais: "BR", // Brasil por padrão
        email: "",
        tipoDocumento: 0, // CPF por padrão
        numeroDocumento: "",
      });
    }
  }, [quantidadeDependentes, append, remove]);

  const handleSubmit = async (data: FormularioData) => {
    setIsSubmitting(true);
    try {
      console.log("Dados do formulário:", data);
      console.log("Customer Stripe:", customerStripe);
      
      // Preparar dados para envio
      const dadosParaEnvio = {
        titular: {
          tipoDocumento: data.titular.tipoDocumento,
          numeroDocumento: data.titular.numeroDocumento,
        },
        dependentes: data.dependentes.map(dep => ({
          nome: dep.nome,
          telefone: dep.telefone,
          codigoPais: getCodigoPais(dep.codigoPais),
          email: dep.email,
          tipoDocumento: dep.tipoDocumento,
          numeroDocumento: dep.numeroDocumento,
        })),
        plano: data.plano,
        quantidadeDependentes: quantidadeDependentes,
        customerStripe: customerStripe
      };

      // Enviar para a API
      const response = await fetch('https://primary-teste-2d67.up.railway.app/webhook-test/finalizar-cadastros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnvio)
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const resultado = await response.json();
      console.log('Resposta da API:', resultado);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Os dados foram enviados para processamento.",
      });
      
      onSubmit?.(data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTelefone = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 11);
  };

  const formatDocumento = (value: string, tipoDocumento: number) => {
    // Remove caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');
    
    // Aplica formatação baseada no tipo
    switch (tipoDocumento) {
      case 0: // CPF
        return cleaned.slice(0, 11);
      case 1: // SSN
        return cleaned.slice(0, 9);
      case 2: // ITIN
        return cleaned.slice(0, 9);
      case 3: // PASSAPORTE
        return value.slice(0, 20); // Passaporte pode ter letras e números
      default:
        return cleaned.slice(0, 20);
    }
  };

  const getCodigoPais = (paisValue: string) => {
    const pais = paises.find(p => p.value === paisValue);
    return pais ? pais.codigo : "+55";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full shadow-glow mb-4 border border-white/30">
            <Shield className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white/90">Cadastro Seguro</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Cadastro de Beneficiários
          </h1>
          <p className="text-white/80 text-lg">
            {planoNome && (
              <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-2 shadow-soft">
                <UserCheck className="w-4 h-4" />
                Plano: {planoNome}
              </span>
            )}
            {customerStripe && (
              <span className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-2 shadow-soft ml-2">
                <Shield className="w-4 h-4" />
                Cliente: {customerStripe}
              </span>
            )}
          </p>
          <p className="text-white/70">
            Preencha o documento do titular e {quantidadeDependentes} dependente(s)
          </p>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Dados do Titular */}
          <Card className="shadow-card border-0 bg-card">
            <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg shadow-glow">
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserCheck className="w-6 h-6" />
                Dados do Titular
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titular.tipoDocumento">Tipo de Documento *</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("titular.tipoDocumento", parseInt(value))}
                    defaultValue="0"
                  >
                    <SelectTrigger className="transition-smooth focus:shadow-soft">
                      <SelectValue placeholder="Selecione o tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposDocumento.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value.toString()}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.titular?.tipoDocumento && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.titular.tipoDocumento.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titular.numeroDocumento">Número do Documento *</Label>
                  <Input
                    id="titular.numeroDocumento"
                    {...form.register("titular.numeroDocumento")}
                    placeholder="Digite o número do documento"
                    onChange={(e) => {
                      const tipoDocumento = form.getValues("titular.tipoDocumento");
                      const formatted = formatDocumento(e.target.value, tipoDocumento);
                      form.setValue("titular.numeroDocumento", formatted);
                    }}
                    className="transition-smooth focus:shadow-soft"
                  />
                  {form.formState.errors.titular?.numeroDocumento && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.titular.numeroDocumento.message}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dependentes */}
          {fields.map((field, index) => (
            <Card key={field.id} className="shadow-card border-0 bg-card">
              <CardHeader className="bg-gradient-accent text-accent-foreground rounded-t-lg shadow-glow">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="w-6 h-6" />
                  Dependente {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`dependentes.${index}.nome`}>Nome Completo *</Label>
                    <Input
                      id={`dependentes.${index}.nome`}
                      {...form.register(`dependentes.${index}.nome`)}
                      placeholder="Digite o nome completo"
                      className="transition-smooth focus:shadow-soft"
                    />
                    {form.formState.errors.dependentes?.[index]?.nome && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.nome?.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dependentes.${index}.codigoPais`}>País *</Label>
                    <Select 
                      onValueChange={(value) => form.setValue(`dependentes.${index}.codigoPais`, value)}
                      defaultValue="BR"
                    >
                      <SelectTrigger className="transition-smooth focus:shadow-soft">
                        <SelectValue placeholder="Selecione o país" />
                      </SelectTrigger>
                      <SelectContent>
                        {paises.map((pais) => (
                          <SelectItem key={pais.value} value={pais.value}>
                            <span className="flex items-center gap-2">
                              <span>{pais.bandeira}</span>
                              <span>{pais.label}</span>
                              <span className="text-muted-foreground">({pais.codigo})</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.dependentes?.[index]?.codigoPais && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.codigoPais?.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dependentes.${index}.telefone`}>Telefone *</Label>
                    <Input
                      id={`dependentes.${index}.telefone`}
                      {...form.register(`dependentes.${index}.telefone`)}
                      placeholder="11999999999"
                      onChange={(e) => {
                        const formatted = formatTelefone(e.target.value);
                        form.setValue(`dependentes.${index}.telefone`, formatted);
                      }}
                      className="transition-smooth focus:shadow-soft"
                    />
                    {form.formState.errors.dependentes?.[index]?.telefone && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.telefone?.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dependentes.${index}.email`}>Email *</Label>
                    <Input
                      id={`dependentes.${index}.email`}
                      type="email"
                      {...form.register(`dependentes.${index}.email`)}
                      placeholder="email@exemplo.com"
                      className="transition-smooth focus:shadow-soft"
                    />
                    {form.formState.errors.dependentes?.[index]?.email && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.email?.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dependentes.${index}.tipoDocumento`}>Tipo de Documento *</Label>
                    <Select 
                      onValueChange={(value) => form.setValue(`dependentes.${index}.tipoDocumento`, parseInt(value))}
                      defaultValue="0"
                    >
                      <SelectTrigger className="transition-smooth focus:shadow-soft">
                        <SelectValue placeholder="Selecione o tipo de documento" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposDocumento.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value.toString()}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.dependentes?.[index]?.tipoDocumento && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.tipoDocumento?.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dependentes.${index}.numeroDocumento`}>Número do Documento *</Label>
                    <Input
                      id={`dependentes.${index}.numeroDocumento`}
                      {...form.register(`dependentes.${index}.numeroDocumento`)}
                      placeholder="Digite o número do documento"
                      onChange={(e) => {
                        const tipoDocumento = form.getValues(`dependentes.${index}.tipoDocumento`);
                        const formatted = formatDocumento(e.target.value, tipoDocumento);
                        form.setValue(`dependentes.${index}.numeroDocumento`, formatted);
                      }}
                      className="transition-smooth focus:shadow-soft"
                    />
                    {form.formState.errors.dependentes?.[index]?.numeroDocumento && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.numeroDocumento?.message}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Botão de Envio */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="bg-gradient-accent hover:opacity-90 transition-smooth px-8 py-6 text-lg font-semibold shadow-glow hover:shadow-card"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Finalizar Cadastro
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};