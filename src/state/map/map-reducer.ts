import type { MapState } from "@/interfaces/state.interface";
import type { MapAction } from "./map-actions";

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case "SET_USER_LOCATION":
      return {
        ...state,
        userLocation: action.payload,
      };
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case "SET_POLYGON_COORDINATES":
      return {
        ...state,
        polygonCoordinates: action.payload,
      };
    case "SET_POLYGON_GEOJSON":
      return {
        ...state,
        polygonGeoJSON: action.payload,
      };
    default:
      return state;
  }
};
