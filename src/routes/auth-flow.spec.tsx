import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/login";
import { AuthProvider } from "@/state/auth/auth-provider";
import { RequireAuth } from "./require-auth";

const renderAuthFlow = () =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/relatorios"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/relatorios"
            element={
              <RequireAuth>
                <h1>Relatórios protegidos</h1>
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );

describe("fluxo de autenticação", () => {
  it("redireciona para a rota solicitada após autenticação válida", async () => {
    const user = userEvent.setup();
    renderAuthFlow();

    await user.type(screen.getByLabelText("Usuário"), "admin");
    await user.type(screen.getByLabelText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(
      await screen.findByRole("heading", { name: "Relatórios protegidos" }),
    ).toBeInTheDocument();
  });

  it("permanece no login e informa credenciais inválidas", async () => {
    renderAuthFlow();

    fireEvent.change(screen.getByLabelText("Usuário"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "senha-incorreta" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Usuário ou senha inválidos.",
    );
    expect(screen.queryByRole("heading", { name: "Relatórios protegidos" }))
      .not.toBeInTheDocument();
  });

  it("não autentica uma conta suspensa mesmo com a senha correta", async () => {
    const user = userEvent.setup();
    renderAuthFlow();

    await user.type(screen.getByLabelText("Usuário"), "Eduardo");
    await user.type(screen.getByLabelText("Senha"), "senhaforte123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Usuário ou senha inválidos.",
    );
    expect(screen.queryByRole("heading", { name: "Relatórios protegidos" }))
      .not.toBeInTheDocument();
  });
});
