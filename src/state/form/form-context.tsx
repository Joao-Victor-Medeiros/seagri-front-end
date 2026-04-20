import { createContext, useContext } from "react";
import type { Dispatch } from "react";
import type { FormState } from "@/interfaces/state.interface";
import type { FormAction } from "./form-actions";

interface FormContextValue {
  state: FormState;
  dispatch: Dispatch<FormAction>;
}

export const FormContext = createContext<FormContextValue | undefined>(undefined);

export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used inside FormProvider");
  }

  return context;
};
