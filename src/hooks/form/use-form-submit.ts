import type { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { submitFarmerForm } from "@/service/form-submit.service";
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

  const submitMutation = useMutation({
    mutationFn: submitFarmerForm,
    onSuccess: () => {
      toast({
        title: "Formulario enviado!",
        description: "Seus dados foram enviados com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Falha no envio",
        description: "Nao foi possivel enviar agora. Tente novamente.",
        variant: "destructive",
      });
    },
  });

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
    submitMutation.mutate(submitPayload);
  };

  return {
    handleSubmit,
    isSubmitting: submitMutation.isPending,
  };
};
