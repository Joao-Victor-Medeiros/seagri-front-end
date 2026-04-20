import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./step-navigation.module.css";
import type { StepNavigationProps } from "../types";

export const StepNavigation = ({
  currentStep,
  canProceed,
  onPrevious,
  onNext,
}: StepNavigationProps) => {
  return (
    <div className={styles.actions}>
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === "personal"}
        className={styles.button}
      >
        <ChevronLeft size={16} />
        Anterior
      </Button>

      {currentStep === "location" ? (
        <Button type="submit" disabled={!canProceed} className={styles.button}>
          <CheckCircle size={16} />
          Enviar Formulario
        </Button>
      ) : (
        <Button type="button" onClick={onNext} disabled={!canProceed} className={styles.button}>
          Proximo
          <ChevronRight size={16} />
        </Button>
      )}
    </div>
  );
};
