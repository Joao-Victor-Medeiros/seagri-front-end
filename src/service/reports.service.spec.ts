import type { PropertyReportMetadata } from "@/interfaces/report.interface";
import { createPropertyReport } from "@/service/reports.service";

describe("reports service", () => {
  const metadata: PropertyReportMetadata = {
    nome: "Sítio Boa Vista",
    descricao: "Brasília / DF",
    area: 12.5,
    coordenadas: null,
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("envia a imagem PNG e os metadados em multipart", async () => {
    const image = new Blob(["png"], { type: "image/png" });
    const pdf = new Blob(["pdf"], { type: "application/pdf" });
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/pdf" }),
      blob: async () => pdf,
    });
    global.fetch = fetchMock;

    await expect(createPropertyReport(image, metadata)).resolves.toBe(pdf);

    const [, request] = fetchMock.mock.calls[0];
    expect(request.method).toBe("POST");
    expect(request.body).toBeInstanceOf(FormData);

    const body = request.body as FormData;
    expect(body.get("imagem")).toBeInstanceOf(File);
    expect((body.get("imagem") as File).name).toBe("mapa-poligono.png");
    expect(body.get("dados")).toBe(JSON.stringify(metadata));
  });

  it("rejeita quando o backend não retorna PDF", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      blob: async () => new Blob(["{}"], { type: "application/json" }),
    });

    await expect(createPropertyReport(new Blob(), metadata)).rejects.toThrow(
      "O backend não retornou um arquivo PDF.",
    );
  });
});