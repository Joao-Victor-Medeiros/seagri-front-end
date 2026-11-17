import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import BeneficiariesPage from "@/pages/beneficiaries";
import { AuthProvider } from "@/state/auth/auth-provider";

describe("ação de impressão de beneficiário", () => {
  it("busca os dados por ID e monta a página A4 com o polígono", async () => {
    const user = userEvent.setup();
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          content: [
            {
              id: 42,
              nome: "Maria Silva",
              cpf: "12345678900",
              contato: "61999999999",
              programaSeagri: "Programa rural",
              nomePropriedade: "Sítio Boa Vista",
              regimeProducao: "Familiar",
              segmentoPrincipal: "Hortaliças",
            },
          ],
          number: 0,
          size: 10,
          totalElements: 1,
          totalPages: 1,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          id: 42,
          informacoesPessoais: {
            nome: "Maria Silva",
            cpf: "12345678900",
            email: "maria@example.com",
            telefone: "61999999999",
          },
          perfilProducao: {
            tamanhoPropriedade: "12",
            regimeProducao: "Familiar",
            seguimentoPrincipal: "Hortaliças",
            seguimentoSecundario: null,
            programaSeagri: "Programa rural",
            produtos: [],
          },
          enderecoRural: {
            nomePropriedade: "Sítio Boa Vista",
            municipio: "Brasília",
            estado: "DF",
            cep: "70000000",
            coordenadas: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-47.9, -15.8],
                    [-47.8, -15.8],
                    [-47.85, -15.7],
                    [-47.9, -15.8],
                  ],
                ],
              },
              properties: { created_at: "", source: "test" },
            },
          },
        }),
      });
    global.fetch = fetchMock;

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MemoryRouter>
            <BeneficiariesPage />
          </MemoryRouter>
        </AuthProvider>
      </QueryClientProvider>,
    );

    await user.click(
      await screen.findByRole("button", {
        name: "Pré-visualizar relatório de Maria Silva",
      }),
    );

    const preview = await screen.findByTitle(
      "Pré-visualização do relatório de Maria Silva",
    );

    const reportHtml = preview.getAttribute("srcdoc") ?? "";
    expect(reportHtml).toContain("@page { size: A4");
    expect(reportHtml).toContain("<polygon points=");
    expect(reportHtml).toContain("Sítio Boa Vista");
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "http://localhost:8081/beneficiarios/42",
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
