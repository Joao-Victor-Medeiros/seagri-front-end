import type { GeoJsonPolygonFeature, LatLngPoint } from "@/interfaces/map.interface";

export type MapAction =
  | { type: "SET_USER_LOCATION"; payload: LatLngPoint }
  | { type: "SET_SELECTED_LOCATION"; payload: LatLngPoint | null }
  | { type: "SET_POLYGON_COORDINATES"; payload: LatLngPoint[] }
  | { type: "SET_POLYGON_GEOJSON"; payload: GeoJsonPolygonFeature | null };
