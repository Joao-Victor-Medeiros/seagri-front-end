import { Building2, MapIcon, User } from "lucide-react";
import styles from "./step-header.module.css";
import type { StepHeaderProps } from "../types";

const STEP_META = {
  personal: { label: "Informacoes Pessoais", icon: User },
  production: { label: "Perfil da Producao", icon: Building2 },
  location: { label: "Endereco Rural Digital", icon: MapIcon },
};

export const StepHeader = ({ currentStep }: StepHeaderProps) => {
  const currentMeta = STEP_META[currentStep];
  const Icon = currentMeta.icon;

  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <h2 className={styles.title}>
          <Icon size={22} />
          {currentMeta.label}
        </h2>

        <div className={styles.progress}>
          <span className={`${styles.dot} ${currentStep === "personal" ? styles.active : ""}`} />
          <span className={`${styles.dot} ${currentStep === "production" ? styles.active : ""}`} />
          <span className={`${styles.dot} ${currentStep === "location" ? styles.active : ""}`} />
        </div>
      </div>
    </div>
  );
};
