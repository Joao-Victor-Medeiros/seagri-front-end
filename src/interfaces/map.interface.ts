export interface LatLngPoint {
  lat: number;
  lng: number;
}

export interface GeoJsonPolygonFeature {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: {
    created_at: string;
    source: string;
  };
}
