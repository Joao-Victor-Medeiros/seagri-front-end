import type { GeoJsonPolygonFeature } from "@/interfaces/map.interface";

export interface PropertyReportMetadata {
  nome: string;
  descricao: string;
  area: number | null;
  coordenadas: GeoJsonPolygonFeature | null;
}