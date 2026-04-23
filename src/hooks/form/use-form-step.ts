import type { FormStep } from "@/interfaces/form.interface";
import { useFormContext } from "@/state/form/form-context";
import { useMapContext } from "@/state/map/map-context";
import { validateStep } from "@/utils/form-validation";

const getNextStep = (step: FormStep): FormStep => {
  if (step === "personal") {
    return "production";
  }

  if (step === "production") {
    return "location";
  }

  return step;
};

const getPreviousStep = (step: FormStep): FormStep => {
  if (step === "location") {
    return "production";
  }

  if (step === "production") {
    return "personal";
  }

  return step;
};

export const useFormStep = () => {
  const { state, dispatch } = useFormContext();
  const { state: mapState } = useMapContext();

  const canProceed = validateStep(
    state.currentStep,
    state.formData,
    mapState.selectedLocation,
  );

  const goToNext = () => {
    dispatch({ type: "SET_STEP", payload: getNextStep(state.currentStep) });
  };

  const goToPrevious = () => {
    dispatch({ type: "SET_STEP", payload: getPreviousStep(state.currentStep) });
  };

  return {
    currentStep: state.currentStep,
    canProceed,
    goToNext,
    goToPrevious,
  };
};
