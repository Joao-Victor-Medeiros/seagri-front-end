import { API_BASE_URL } from "@/service/api-config";
import {
  getBeneficiaryById,
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

  it("fetches beneficiary detail by ID for the print report", async () => {
    const beneficiary = { id: 42 };
    fetchMock.mockResolvedValue(jsonResponse(beneficiary));

    await expect(getBeneficiaryById(42)).resolves.toEqual(beneficiary);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/beneficiarios/42`,
    );
  });

  it("encodes the beneficiary ID in the detail endpoint", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ id: "beneficiario 42" }));

    await getBeneficiaryById("beneficiario 42");

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/beneficiarios/beneficiario%2042`,
    );
  });

  it("propagates detail endpoint failures", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn(),
    });

    await expect(getBeneficiaryById(42)).rejects.toThrow(
      "Falha ao consultar beneficiários (HTTP 404).",
    );
  });
});
