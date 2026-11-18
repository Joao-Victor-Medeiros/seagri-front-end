import { useCallback, useState, type RefObject } from "react";
import type { PropertyReportMetadata } from "@/interfaces/report.interface";
import { createPropertyReport } from "@/service/reports.service";

export interface MapCaptureHandle {
  capture: () => Promise<Blob>;
}

interface UsePropertyReportParams {
  captureHandle: RefObject<MapCaptureHandle | null>;
}

export const usePropertyReport = ({
  captureHandle,
}: UsePropertyReportParams) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(
    async (metadata: PropertyReportMetadata) => {
      if (!captureHandle.current) {
        throw new Error("O mapa de exportação ainda não está pronto.");
      }

      setIsGenerating(true);
      setError(null);

      try {
        const image = await captureHandle.current.capture();
        const pdf = await createPropertyReport(image, metadata);
        const url = URL.createObjectURL(pdf);
        const openedWindow = window.open(url, "_blank", "noopener,noreferrer");

        if (!openedWindow) {
          const link = document.createElement("a");
          link.href = url;
          link.download = "relatorio-propriedade.pdf";
          link.click();
        }

        window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } catch (cause) {
        const message =
          cause instanceof Error
            ? cause.message
            : "Não foi possível gerar o relatório.";
        setError(message);
        throw cause;
      } finally {
        setIsGenerating(false);
      }
    },
    [captureHandle],
  );

  return { generateReport, isGenerating, error };
};