import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "./app-routes";
import { AuthProvider } from "@/state/auth/auth-provider";

jest.mock("@/pages/home", () => ({
  __esModule: true,
  default: () => <h1>Cadastro de beneficiário</h1>,
}));
jest.mock("@/pages/reports", () => ({
  __esModule: true,
  default: () => <h1>Relatórios</h1>,
}));
jest.mock("@/pages/not-found", () => ({
  __esModule: true,
  default: () => <h1>Página não encontrada</h1>,
}));

describe("rotas da aplicação", () => {
  it.each(["/cadatro-beneficiario", "/"])(
    "permite acessar o cadastro após login em %s",
    async (initialPath) => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <MemoryRouter initialEntries={[initialPath]}>
            <AppRoutes />
          </MemoryRouter>
        </AuthProvider>,
      );

      await user.type(screen.getByLabelText("Usuário"), "fernando");
      await user.type(screen.getByLabelText("Senha"), "123456");
      await user.click(screen.getByRole("button", { name: "Entrar" }));

      expect(
        await screen.findByRole("heading", { name: "Cadastro de beneficiário" }),
      ).toBeInTheDocument();
    },
  );
});
