import type { FormState } from "@/interfaces/state.interface";

export const selectCurrentStep = (state: FormState) => state.currentStep;
export const selectFormData = (state: FormState) => state.formData;
export const selectProducts = (state: FormState) => state.formData.products;
