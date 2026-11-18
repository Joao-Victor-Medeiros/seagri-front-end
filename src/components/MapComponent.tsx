import { MapComponent as NewMapComponent } from "./map";
import type { Ref } from "react";
import type { MapCaptureHandle } from "@/hooks/map/use-property-report";

export interface MapComponentProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  selectedLocation?: { lat: number; lng: number } | null;
  captureRef?: Ref<MapCaptureHandle>;
}

export function MapComponent({ captureRef }: MapComponentProps) {
  return <NewMapComponent captureRef={captureRef} />;
}
