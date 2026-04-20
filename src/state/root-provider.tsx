import type { ReactNode } from "react";
import { FormProvider } from "@/state/form/form-provider";
import { MapProvider } from "@/state/map/map-provider";

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <FormProvider>
      <MapProvider>{children}</MapProvider>
    </FormProvider>
  );
};
