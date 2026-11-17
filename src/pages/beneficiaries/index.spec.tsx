import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BeneficiariesPage from "@/pages/beneficiaries";
import { AuthProvider } from "@/state/auth/auth-provider";

describe("ação de impressão de beneficiário", () => {
  it("abre o relatório com o ID do beneficiário", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
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

    const printLink = await screen.findByRole("link", {
      name: "Imprimir relatório de Maria Silva",
    });

    expect(printLink).toHaveAttribute(
      "href",
      "http://localhost:8081/relatorios/propriedade/42",
    );
    expect(printLink).toHaveAttribute("target", "_blank");
  });
});
