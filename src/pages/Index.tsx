import { useEffect, useState } from "react";
import { FormularioCadastro } from "@/components/FormularioCadastro";

const Index = () => {
  const [urlParams, setUrlParams] = useState<{
    dependentes: number;
    plano?: string;
  }>({ dependentes: 0 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dependentesCount = parseInt(params.get('dependentes') || '0');
    const plano = params.get('plano') || undefined;
    
    setUrlParams({
      dependentes: dependentesCount,
      plano
    });
  }, []);

  const handleFormSubmit = (data: any) => {
    console.log('Dados enviados:', data);
    // Aqui você pode integrar com sua API
  };

  return (
    <FormularioCadastro 
      quantidadeDependentes={urlParams.dependentes}
      planoNome={urlParams.plano}
      onSubmit={handleFormSubmit}
    />
  );
};

export default Index;
