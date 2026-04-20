import { MobileForm as NewMobileForm } from "@/componentes/mobile-form";

export interface MobileFormProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  selectedLocation?: { lat: number; lng: number } | null;
}

export function MobileForm(_props: MobileFormProps) {
  return <NewMobileForm />;
}
