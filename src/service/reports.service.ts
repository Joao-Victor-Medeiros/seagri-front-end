import type { PropertyReportMetadata } from "@/interfaces/report.interface";
import { API_BASE_URL } from "@/service/api-config";

export const createPropertyReport = async (
  image: Blob,
  metadata: PropertyReportMetadata,
): Promise<Blob> => {
  const formData = new FormData();
  formData.append("imagem", image, "mapa-poligono.png");
  formData.append("dados", JSON.stringify(metadata));

  const response = await fetch(`${API_BASE_URL}/api/relatorios`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Falha ao gerar relatório (HTTP ${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/pdf")) {
    throw new Error("O backend não retornou um arquivo PDF.");
  }

  return response.blob();
};