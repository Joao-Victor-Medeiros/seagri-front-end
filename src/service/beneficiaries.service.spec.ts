import { API_BASE_URL } from "@/service/api-config";
import {
  getBeneficiaryReportUrl,
  getBeneficiaries,
  searchBeneficiaries,
} from "@/service/beneficiaries.service";

const fetchMock = jest.fn();

const jsonResponse = (data: unknown, status = 200) =>
  ({
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(data),
  }) as Response;

describe("beneficiaries service", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
  });

  it("requests a server-paginated list with the selected sort", async () => {
    const page = {
      content: [],
      number: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
    };
    fetchMock.mockResolvedValue(jsonResponse(page));

    await getBeneficiaries({
      page: 0,
      size: 10,
      sortField: "nome",
      sortDirection: "asc",
    });

    const [requestUrl] = fetchMock.mock.calls[0];
    const url = new URL(requestUrl);
    expect(url.origin).toBe(API_BASE_URL);
    expect(url.pathname).toBe("/beneficiarios");
    expect(url.searchParams.get("page")).toBe("0");
    expect(url.searchParams.get("size")).toBe("10");
    expect(url.searchParams.get("sort")).toBe("nome,asc");
  });

  it("encodes the search text and propagates HTTP failures", async () => {
    fetchMock.mockResolvedValue(jsonResponse([], 503));

    await expect(searchBeneficiaries("João Silva")).rejects.toThrow(
      "Falha ao consultar beneficiários (HTTP 503).",
    );

    const [requestUrl] = fetchMock.mock.calls[0];
    const url = new URL(requestUrl);
    expect(url.pathname).toBe("/beneficiarios/search");
    expect(url.searchParams.get("query")).toBe("João Silva");
  });

  it("uses the beneficiary ID in the property report endpoint", () => {
    const url = new URL(getBeneficiaryReportUrl(42));

    expect(url.origin).toBe(API_BASE_URL);
    expect(url.pathname).toBe("/relatorios/propriedade/42");
  });
});
