import type { FormState } from "@/interfaces/state.interface";
import { INITIAL_FORM_DATA, INITIAL_STEP } from "@/utils/constants";

export const formInitialState: FormState = {
  currentStep: INITIAL_STEP,
  formData: INITIAL_FORM_DATA,
};
