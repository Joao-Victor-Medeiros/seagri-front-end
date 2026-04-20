import type { GeoJsonPolygonFeature, LatLngPoint } from "@/interfaces/map.interface";

export const generateGeoJSON = (
  coords: LatLngPoint[],
): GeoJsonPolygonFeature | null => {
  if (!coords || coords.length === 0) {
    return null;
  }

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        coords.map((point) => [point.lng, point.lat]).concat([
          [coords[0].lng, coords[0].lat],
        ]),
      ],
    },
    properties: {
      created_at: new Date().toISOString(),
      source: "mobile-map-form",
    },
  };
};
