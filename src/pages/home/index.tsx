import { MobileForm } from "@/components/forms/mobile-form";
import { AppNavigation } from "@/components/app-navigation";
import styles from "./home.module.css";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AppNavigation />
        <div className={styles.header}>
          <h1 className={styles.title}>Formulario de cadastro do agricultor</h1>
          <p className={styles.subtitle}>Seagri - DF</p>
        </div>

        <MobileForm />
      </div>
    </div>
  );
};

export default HomePage;
