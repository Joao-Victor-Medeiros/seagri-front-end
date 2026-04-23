import { MapComponent as NewMapComponent } from "./map";

export interface MapComponentProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  selectedLocation?: { lat: number; lng: number } | null;
}

export function MapComponent(_props: MapComponentProps) {
  return <NewMapComponent />;
}
