import type { GeoJsonPolygonFeature } from "@/interfaces/map.interface";

export interface FarmerSubmitPayload {
  informacoesPessoais: {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
  };
  perfilProducao: {
    tamanhoPropriedade: string;
    regimeProducao: string;
    seguimentoPrincipal: string;
    seguimentoSecundario: string | null;
    programaSeagri: string | null;
    produtos: Array<{
      nome: string;
      validade: string;
      quantidade: string;
      unidade: string;
      preco: string;
    }>;
  };
  enderecoRural: {
    nomePropriedade: string;
    municipio: string;
    estado: string;
    cep: string | null;
    coordenadas: GeoJsonPolygonFeature | null;
  };
}
