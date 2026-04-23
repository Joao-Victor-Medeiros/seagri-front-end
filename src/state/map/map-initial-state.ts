import type { MapState } from "@/interfaces/state.interface";

export const mapInitialState: MapState = {
  userLocation: null,
  selectedLocation: null,
  polygonCoordinates: [],
  polygonGeoJSON: null,
};
