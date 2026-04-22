import { useToast } from "@/hooks/use-toast";
import { useFormContext } from "@/state/form/form-context";
import { useMapContext } from "@/state/map/map-context";
import { useFormStep } from "./use-form-step";
import { useProductList } from "./use-product-list";
import { useFormSubmit } from "./use-form-submit";
import { getProductExpiryValidationError } from "@/utils/form-validation";

export const useFarmerForm = () => {
  const { toast } = useToast();
  const { state, dispatch } = useFormContext();
  const { state: mapState } = useMapContext();
  const { currentStep, canProceed, goToNext, goToPrevious } = useFormStep();
  const { addProduct, removeProduct, updateProduct } = useProductList();
  const { handleSubmit } = useFormSubmit();

  const setFieldValue = (field: keyof typeof state.formData, value: string) => {
    dispatch({ type: "SET_FIELD", payload: { field, value } });
  };

  const handleNextStep = () => {
    if (currentStep === "production") {
      const expiryValidationError = getProductExpiryValidationError(state.formData);

      if (expiryValidationError) {
        toast({
          title: "Validade invalida",
          description: expiryValidationError,
          variant: "destructive",
        });
        return;
      }
    }

    if (!canProceed) {
      toast({
        title: "Campos obrigatorios",
        description: "Por favor, preencha todos os campos obrigatorios.",
        variant: "destructive",
      });
      return;
    }

    goToNext();
  };

  return {
    formData: state.formData,
    currentStep,
    selectedLocation: mapState.selectedLocation,
    polygonCoordinates: mapState.polygonCoordinates,
    canProceed,
    setFieldValue,
    addProduct,
    removeProduct,
    updateProduct,
    handleNextStep,
    handlePreviousStep: goToPrevious,
    handleSubmit,
  };
};
