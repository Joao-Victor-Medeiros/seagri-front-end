import type {
  BeneficiaryDetailDto,
  BeneficiaryListDto,
  BeneficiaryPage,
  BeneficiarySortField,
  SortDirection,
} from "@/interfaces/beneficiary.interface";
import { API_BASE_URL } from "@/service/api-config";

interface GetBeneficiariesParams {
  page: number;
  size: number;
  sortField: BeneficiarySortField;
  sortDirection: SortDirection;
}

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Falha ao consultar beneficiários (HTTP ${response.status}).`);
  }

  return response.json();
};

export const getBeneficiaries = ({
  page,
  size,
  sortField,
  sortDirection,
}: GetBeneficiariesParams): Promise<BeneficiaryPage> => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: `${sortField},${sortDirection}`,
  });

  return request(`/beneficiarios?${params.toString()}`);
};

export const searchBeneficiaries = (
  query: string,
): Promise<BeneficiaryListDto[]> => {
  const params = new URLSearchParams({ query });
  return request(`/beneficiarios/search?${params.toString()}`);
};

export const getBeneficiaryById = (
  beneficiaryId: number | string,
): Promise<BeneficiaryDetailDto> =>
  request(`/beneficiarios/${encodeURIComponent(String(beneficiaryId))}`);
