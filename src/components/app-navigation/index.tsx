import { BarChart3, ClipboardList, Sprout } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./app-navigation.module.css";

export const AppNavigation = () => (
  <header className={styles.header}>
    <NavLink to="/" end className={styles.brand} aria-label="Seagri DF - início">
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
        to="/"
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
  </header>
);
