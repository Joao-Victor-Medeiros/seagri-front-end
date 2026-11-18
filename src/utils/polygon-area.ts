import type { GeoJsonPolygonFeature } from "@/interfaces/map.interface";

const EARTH_RADIUS_METERS = 6_378_137;

export const calculatePolygonAreaInHectares = (
  feature: GeoJsonPolygonFeature | null,
): number | null => {
  const ring = feature?.geometry.coordinates[0];
  if (!ring || ring.length < 3) {
    return null;
  }

  const averageLatitude =
    (ring.reduce((sum, [, latitude]) => sum + latitude, 0) / ring.length) *
    (Math.PI / 180);
  const metersPerDegreeLatitude =
    (Math.PI * EARTH_RADIUS_METERS) / 180;
  const metersPerDegreeLongitude =
    metersPerDegreeLatitude * Math.cos(averageLatitude);

  let area = 0;
  for (let index = 0; index < ring.length; index += 1) {
    const [longitudeA, latitudeA] = ring[index];
    const [longitudeB, latitudeB] = ring[(index + 1) % ring.length];
    const xA = longitudeA * metersPerDegreeLongitude;
    const yA = latitudeA * metersPerDegreeLatitude;
    const xB = longitudeB * metersPerDegreeLongitude;
    const yB = latitudeB * metersPerDegreeLatitude;
    area += xA * yB - xB * yA;
  }

  return Math.abs(area) / 2 / 10_000;
};