import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/state/auth/auth-provider";
import styles from "./login.module.css";

interface LoginLocationState {
  from?: {
    pathname?: string;
  };
}

const LoginPage = () => {
  const { user, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const redirectTo =
    (location.state as LoginLocationState | null)?.from?.pathname ??
    "/cadatro-beneficiario";

  if (user) {
    return <Navigate to="/cadatro-beneficiario" replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!login(username, password)) {
      setError("Usuário ou senha inválidos.");
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <img
          className={styles.dfLogo}
          src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Bras%C3%A3o_do_Distrito_Federal_%28Brasil%29.svg"
          alt="Brasão do Distrito Federal"
        />
        <p className={styles.eyebrow}>SEAGRI-DF · GESTÃO RURAL</p>
        <h1 id="login-title" className={styles.title}>
          Acesse sua conta
        </h1>
        <p className={styles.subtitle}>
          Entre para acessar o cadastro e os relatórios.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className={styles.field}>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              required
            />
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className={styles.submit}>
            Entrar
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </form>

        <aside className={styles.demoAccounts} aria-label="Contas de demonstração">
          <strong>Acessos de demonstração</strong>
          <span>admin · 123456 · ADMIN</span>
        </aside>
      </section>
    </main>
  );
};

export default LoginPage;
