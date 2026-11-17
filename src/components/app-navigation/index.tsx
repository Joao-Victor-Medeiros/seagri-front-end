import {
  BarChart3,
  ClipboardList,
  LogOut,
  Sprout,
  UsersRound,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/state/auth/auth-provider";
import styles from "./app-navigation.module.css";

export const AppNavigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <NavLink
        to="/cadatro-beneficiario"
        end
        className={styles.brand}
        aria-label="Seagri DF - início"
      >
        <span className={styles.brandIcon}>
          <Sprout size={22} aria-hidden="true" />
        </span>
        <span className={styles.brandText}>
          <strong>SEAGRI-DF</strong>
          <span>Gestão rural</span>
        </span>
      </NavLink>

      <nav className={styles.navigation} aria-label="Navegação principal">
        <NavLink
          to="/beneficiarios"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <UsersRound size={18} aria-hidden="true" />
          <span>Beneficiários</span>
        </NavLink>
        <NavLink
          to="/cadatro-beneficiario"
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <ClipboardList size={18} aria-hidden="true" />
          <span>Cadastro</span>
        </NavLink>
        <NavLink
          to="/relatorios"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <BarChart3 size={18} aria-hidden="true" />
          <span>Relatórios</span>
        </NavLink>
      </nav>

      <div className={styles.account}>
        {user && (
          <span className={styles.userName}>
            {user.username} · {user.role}
          </span>
        )}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={styles.logout}
          onClick={handleLogout}
        >
          <LogOut size={16} aria-hidden="true" />
          <span>Sair</span>
        </Button>
      </div>
    </header>
  );
};
