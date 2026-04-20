import type { FarmerFormData, FormStep, ProductItem } from "@/interfaces/form.interface";
import type { LatLngPoint } from "@/interfaces/map.interface";

export interface SectionBaseProps {
  formData: FarmerFormData;
  setFieldValue: (field: keyof FarmerFormData, value: string) => void;
}

export interface ProductionSectionProps extends SectionBaseProps {
  addProduct: () => void;
  removeProduct: (index: number) => void;
  updateProduct: (index: number, field: keyof ProductItem, value: string) => void;
}

export interface LocationSectionProps extends SectionBaseProps {
  polygonPointsCount: number;
}

export interface StepHeaderProps {
  currentStep: FormStep;
}

export interface StepNavigationProps {
  currentStep: FormStep;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export interface MobileFormProps {
  formData: FarmerFormData;
  currentStep: FormStep;
  selectedLocation: LatLngPoint | null;
  polygonPointsCount: number;
  canProceed: boolean;
  setFieldValue: (field: keyof FarmerFormData, value: string) => void;
  addProduct: () => void;
  removeProduct: (index: number) => void;
  updateProduct: (index: number, field: keyof ProductItem, value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: (event: React.FormEvent) => void;
}
