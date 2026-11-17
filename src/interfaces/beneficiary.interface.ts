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
