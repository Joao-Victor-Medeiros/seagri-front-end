import type { ReactNode } from "react";
import { FormProvider } from "@/state/form/form-provider";
import { MapProvider } from "@/state/map/map-provider";
import { AuthProvider } from "@/state/auth/auth-provider";

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <AuthProvider>
      <FormProvider>
        <MapProvider>{children}</MapProvider>
      </FormProvider>
    </AuthProvider>
  );
};
