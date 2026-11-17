import type { FarmerSubmitPayload } from "@/interfaces/payload.interface";
import { API_BASE_URL } from "@/service/api-config";

export interface submitResponse {
  id?: number;
  message?: string;
}

export const submitFarmerForm = async (
  payload: FarmerSubmitPayload,
): Promise<submitResponse> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar formulario para o endpoint.");
  }

  return response.json();
};