import type { FarmerFormData, FormStep } from "@/interfaces/form.interface";
import type { GeoJsonPolygonFeature, LatLngPoint } from "@/interfaces/map.interface";

export interface FormState {
  currentStep: FormStep;
  formData: FarmerFormData;
}

export interface MapState {
  userLocation: LatLngPoint | null;
  selectedLocation: LatLngPoint | null;
  polygonCoordinates: LatLngPoint[];
  polygonGeoJSON: GeoJsonPolygonFeature | null;
}
