import type { GeoJsonPolygonFeature } from "@/interfaces/map.interface";

export interface BeneficiaryListDto {
  id: number | string;
  nome: string;
  cpf: string;
  contato: string | null;
  programaSeagri: string | null;
  nomePropriedade: string | null;
  regimeProducao: string | null;
  segmentoPrincipal: string | null;
}

export interface BeneficiaryDetailDto {
  id: number | string;
  informacoesPessoais: {
    nome: string;
    cpf: string;
    email: string | null;
    telefone: string | null;
  };
  perfilProducao: {
    tamanhoPropriedade: string | number | null;
    regimeProducao: string | null;
    seguimentoPrincipal: string | null;
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
    nomePropriedade: string | null;
    municipio: string | null;
    estado: string | null;
    cep: string | null;
    coordenadas: GeoJsonPolygonFeature | null;
  };
}

export interface BeneficiaryPage {
  content: BeneficiaryListDto[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type BeneficiarySortField =
  | "nome"
  | "cpf"
  | "contato"
  | "programaSeagri"
  | "nomePropriedade"
  | "regimeProducao"
  | "segmentoPrincipal";

export type SortDirection = "asc" | "desc";
