import type { FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFormContext } from "@/state/form/form-context";
import { useMapContext } from "@/state/map/map-context";
import { mapFormToSubmitPayload } from "@/utils/form-mapper";
import { getProductExpiryValidationError } from "@/utils/form-validation";

export const useFormSubmit = () => {
  const { toast } = useToast();
  const {
    state: { formData },
  } = useFormContext();
  const {
    state: { selectedLocation, polygonGeoJSON },
  } = useMapContext();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const expiryValidationError = getProductExpiryValidationError(formData);

    if (expiryValidationError) {
      toast({
        title: "Validade invalida",
        description: expiryValidationError,
        variant: "destructive",
      });
      return;
    }

    if (!selectedLocation) {
      toast({
        title: "Localizacao necessaria",
        description: "Por favor, selecione uma localizacao no mapa.",
        variant: "destructive",
      });
      return;
    }

    const submitPayload = mapFormToSubmitPayload(formData, polygonGeoJSON);
    console.log("Formulario enviado:", submitPayload);

    toast({
      title: "Formulario enviado!",
      description: "Seus dados foram enviados com sucesso.",
    });
  };

  return {
    handleSubmit,
  };
};
