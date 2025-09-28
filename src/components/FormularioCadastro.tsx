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

// Schema de validação
const pessoaSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),
  rg: z.string().min(5, "RG inválido").max(20, "RG muito longo"),
  dataNascimento: z.string().min(1, "Data de nascimento obrigatória"),
  telefone: z.string().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  endereco: z.string().min(5, "Endereço muito curto").max(200, "Endereço muito longo"),
});

const dependenteSchema = pessoaSchema.extend({
  parentesco: z.string().min(1, "Parentesco obrigatório"),
});

const formularioSchema = z.object({
  titular: pessoaSchema,
  dependentes: z.array(dependenteSchema),
  plano: z.string().optional(),
});

type FormularioData = z.infer<typeof formularioSchema>;

interface FormularioCadastroProps {
  quantidadeDependentes?: number;
  planoNome?: string;
  onSubmit?: (data: FormularioData) => void;
}

export const FormularioCadastro = ({
  quantidadeDependentes = 0,
  planoNome,
  onSubmit
}: FormularioCadastroProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormularioData>({
    resolver: zodResolver(formularioSchema),
    defaultValues: {
      titular: {
        nome: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
        telefone: "",
        email: "",
        endereco: "",
      },
      dependentes: Array.from({ length: quantidadeDependentes }, () => ({
        nome: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
        telefone: "",
        email: "",
        endereco: "",
        parentesco: "",
      })),
      plano: planoNome || "",
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "dependentes",
  });

  const handleSubmit = async (data: FormularioData) => {
    setIsSubmitting(true);
    try {
      console.log("Dados do formulário:", data);
      
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Os dados foram enviados para processamento.",
      });
      
      onSubmit?.(data);
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 11);
  };

  const formatTelefone = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 11);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-card px-6 py-3 rounded-full shadow-soft mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Cadastro Seguro</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Cadastro de Beneficiários
          </h1>
          <p className="text-muted-foreground text-lg">
            {planoNome && (
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
                <UserCheck className="w-4 h-4" />
                Plano: {planoNome}
              </span>
            )}
          </p>
          <p className="text-muted-foreground">
            Preencha os dados do titular e {quantidadeDependentes} dependente(s)
          </p>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Dados do Titular */}
          <Card className="shadow-card border-0 bg-gradient-card">
            <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserCheck className="w-6 h-6" />
                Dados do Titular
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titular.nome">Nome Completo *</Label>
                  <Input
                    id="titular.nome"
                    {...form.register("titular.nome")}
                    placeholder="Digite o nome completo"
                    className="transition-smooth focus:shadow-soft"
                  />
                  {form.formState.errors.titular?.nome && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.titular.nome.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titular.cpf">CPF *</Label>
                  <Input
                    id="titular.cpf"
                    {...form.register("titular.cpf")}
                    placeholder="00000000000"
                    onChange={(e) => {
                      const formatted = formatCPF(e.target.value);
                      form.setValue("titular.cpf", formatted);
                    }}
                    className="transition-smooth focus:shadow-soft"
                  />
                  {form.formState.errors.titular?.cpf && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.titular.cpf.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titular.rg">RG *</Label>
                  <Input
                    id="titular.rg"
                    {...form.register("titular.rg")}
                    placeholder="Digite o RG"
                    className="transition-smooth focus:shadow-soft"
                  />
                  {form.formState.errors.titular?.rg && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.titular.rg.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titular.dataNascimento">Data de Nascimento *</Label>
                  <Input
                    id="titular.dataNascimento"
                    type="date"
                    {...form.register("titular.dataNascimento")}
                    className="transition-smooth focus:shadow-soft"
                  />
                  {form.formState.errors.titular?.dataNascimento && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.titular.dataNascimento.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titular.telefone">Telefone *</Label>
                  <Input
                    id="titular.telefone"
                    {...form.register("titular.telefone")}
                    placeholder="11999999999"
                    onChange={(e) => {
                      const formatted = formatTelefone(e.target.value);
                      form.setValue("titular.telefone", formatted);
                    }}
                    className="transition-smooth focus:shadow-soft"
                  />
                  {form.formState.errors.titular?.telefone && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.titular.telefone.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titular.email">Email *</Label>
                  <Input
                    id="titular.email"
                    type="email"
                    {...form.register("titular.email")}
                    placeholder="email@exemplo.com"
                    className="transition-smooth focus:shadow-soft"
                  />
                  {form.formState.errors.titular?.email && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.titular.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="titular.endereco">Endereço Completo *</Label>
                <Input
                  id="titular.endereco"
                  {...form.register("titular.endereco")}
                  placeholder="Rua, número, bairro, cidade, CEP"
                  className="transition-smooth focus:shadow-soft"
                />
                {form.formState.errors.titular?.endereco && (
                  <span className="text-destructive text-sm">
                    {form.formState.errors.titular.endereco.message}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Dependentes */}
          {fields.map((field, index) => (
            <Card key={field.id} className="shadow-card border-0 bg-gradient-card">
              <CardHeader className="bg-gradient-to-r from-accent to-primary text-accent-foreground rounded-t-lg">
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
                    <Label htmlFor={`dependentes.${index}.parentesco`}>Parentesco *</Label>
                    <Select onValueChange={(value) => form.setValue(`dependentes.${index}.parentesco`, value)}>
                      <SelectTrigger className="transition-smooth focus:shadow-soft">
                        <SelectValue placeholder="Selecione o parentesco" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cônjuge">Cônjuge</SelectItem>
                        <SelectItem value="filho(a)">Filho(a)</SelectItem>
                        <SelectItem value="pai">Pai</SelectItem>
                        <SelectItem value="mãe">Mãe</SelectItem>
                        <SelectItem value="irmão(ã)">Irmão(ã)</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.dependentes?.[index]?.parentesco && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.parentesco?.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dependentes.${index}.cpf`}>CPF *</Label>
                    <Input
                      id={`dependentes.${index}.cpf`}
                      {...form.register(`dependentes.${index}.cpf`)}
                      placeholder="00000000000"
                      onChange={(e) => {
                        const formatted = formatCPF(e.target.value);
                        form.setValue(`dependentes.${index}.cpf`, formatted);
                      }}
                      className="transition-smooth focus:shadow-soft"
                    />
                    {form.formState.errors.dependentes?.[index]?.cpf && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.cpf?.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dependentes.${index}.rg`}>RG *</Label>
                    <Input
                      id={`dependentes.${index}.rg`}
                      {...form.register(`dependentes.${index}.rg`)}
                      placeholder="Digite o RG"
                      className="transition-smooth focus:shadow-soft"
                    />
                    {form.formState.errors.dependentes?.[index]?.rg && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.rg?.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dependentes.${index}.dataNascimento`}>Data de Nascimento *</Label>
                    <Input
                      id={`dependentes.${index}.dataNascimento`}
                      type="date"
                      {...form.register(`dependentes.${index}.dataNascimento`)}
                      className="transition-smooth focus:shadow-soft"
                    />
                    {form.formState.errors.dependentes?.[index]?.dataNascimento && (
                      <span className="text-destructive text-sm">
                        {form.formState.errors.dependentes[index]?.dataNascimento?.message}
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`dependentes.${index}.endereco`}>Endereço Completo *</Label>
                  <Input
                    id={`dependentes.${index}.endereco`}
                    {...form.register(`dependentes.${index}.endereco`)}
                    placeholder="Rua, número, bairro, cidade, CEP"
                    className="transition-smooth focus:shadow-soft"
                  />
                  {form.formState.errors.dependentes?.[index]?.endereco && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.dependentes[index]?.endereco?.message}
                    </span>
                  )}
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
              className="bg-gradient-primary hover:opacity-90 transition-smooth px-8 py-6 text-lg font-semibold shadow-card"
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