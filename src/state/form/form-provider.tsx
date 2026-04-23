import { useMemo, useReducer, type ReactNode } from "react";
import { FormContext } from "./form-context";
import { formInitialState } from "./form-initial-state";
import { formReducer } from "./form-reducer";

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, formInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
