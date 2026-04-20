import type { MapState } from "@/interfaces/state.interface";

export const selectUserLocation = (state: MapState) => state.userLocation;
export const selectSelectedLocation = (state: MapState) => state.selectedLocation;
export const selectPolygonCoordinates = (state: MapState) => state.polygonCoordinates;
export const selectPolygonGeoJSON = (state: MapState) => state.polygonGeoJSON;
