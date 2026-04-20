import type { FarmerFormData, FormStep } from "@/interfaces/form.interface";
import type { LatLngPoint } from "@/interfaces/map.interface";

export const validateStep = (
  step: FormStep,
  formData: FarmerFormData,
  selectedLocation: LatLngPoint | null,
): boolean => {
  switch (step) {
    case "personal":
      return !!(
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.cpf
      );
    case "production":
      return !!(
        formData.propertySize &&
        formData.mainCrop &&
        formData.productionType
      );
    case "location":
      return !!(
        selectedLocation &&
        formData.propertyName &&
        formData.municipality &&
        formData.state
      );
    default:
      return false;
  }
};
