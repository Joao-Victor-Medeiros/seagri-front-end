import type { FarmerSubmitPayload } from "@/interfaces/payload.interface";

const FORM_ENDPOINT = "http://localhost:8080";

export interface submitResponse {
  id?: number;
  message?: string;
}

export const submitFarmerForm = async (
  payload: FarmerSubmitPayload,
): Promise<submitResponse> => {
  const response = await fetch(FORM_ENDPOINT, {
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