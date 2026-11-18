import { forwardRef, useImperativeHandle, useRef } from "react";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import L from "leaflet";
import "leaflet-simple-map-screenshoter";
import type { GeoJsonPolygonFeature } from "@/interfaces/map.interface";
import type { MapCaptureHandle } from "@/hooks/map/use-property-report";
import styles from "./map.module.css";

const EXPORT_WIDTH = 1200;
const EXPORT_HEIGHT = 800;
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

interface PropertyMapExportProps {
  center: L.LatLngExpression;
  polygon: GeoJsonPolygonFeature | null;
}

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

const ExportMapController = forwardRef<MapCaptureHandle, {
  polygon: GeoJsonPolygonFeature | null;
}>(({ polygon }, ref) => {
  const map = useMap();
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const tilesLoadedRef = useRef(false);

  useImperativeHandle(
    ref,
    () => ({
      capture: async () => {
        if (!polygon) {
          throw new Error("Desenhe um polígono antes de gerar o relatório.");
        }

        const ring = polygon.geometry.coordinates[0] as [number, number][];
        const bounds = L.latLngBounds(
          ring.map(([longitude, latitude]) => [latitude, longitude] as L.LatLngTuple),
        );

        map.invalidateSize();
        map.fitBounds(bounds, { padding: [40, 40] });
        await new Promise<void>((resolve) => {
          if (!map.getBounds().equals(bounds)) {
            map.once("moveend", () => resolve());
            return;
          }
          resolve();
        });
        await new Promise<void>((resolve) => {
          if (!tilesLoadedRef.current) {
            if (tileLayerRef.current) {
              tileLayerRef.current.once("load", () => resolve());
            } else {
              resolve();
            }
            return;
          }
          resolve();
        });
        await wait(250);

        const screenshoter = L.simpleMapScreenshoter({
          hidden: true,
          preventDownload: true,
          mimeType: "image/png",
          hideElementsWithSelectors: [".leaflet-control-container"],
          domtoimageOptions: {
            width: EXPORT_WIDTH,
            height: EXPORT_HEIGHT,
            bgcolor: "#ffffff",
            cacheBust: true,
          },
        }).addTo(map);

        try {
          const result = await screenshoter.takeScreen("blob");
          if (!(result instanceof Blob)) {
            throw new Error("A captura do mapa não retornou uma imagem válida.");
          }
          return result;
        } finally {
          map.removeControl(screenshoter);
        }
      },
    }),
    [map, polygon],
  );

  return (
    <TileLayer
      ref={(layer) => {
        tileLayerRef.current = layer;
      }}
      attribution=""
      url={TILE_URL}
      crossOrigin="anonymous"
      eventHandlers={{
        load: () => {
          tilesLoadedRef.current = true;
        },
      }}
    />
  );
});

ExportMapController.displayName = "ExportMapController";

export const PropertyMapExport = forwardRef<MapCaptureHandle, PropertyMapExportProps>(
  ({ center, polygon }, ref) => {
    const controllerRef = useRef<MapCaptureHandle>(null);

    useImperativeHandle(ref, () => ({
      capture: async () => {
        if (!controllerRef.current) {
          throw new Error("O mapa de exportação ainda está carregando.");
        }
        return controllerRef.current.capture();
      },
    }), []);

    return (
      <div
        className={styles.exportMap}
        style={{ width: EXPORT_WIDTH, height: EXPORT_HEIGHT }}
        aria-hidden="true"
      >
        <MapContainer
          center={center}
          zoom={13}
          preferCanvas
          zoomControl={false}
          attributionControl={false}
          style={{ width: EXPORT_WIDTH, height: EXPORT_HEIGHT }}
        >
          <ExportMapController ref={controllerRef} polygon={polygon} />
          {polygon ? (
            <GeoJSON data={polygon as unknown as GeoJsonObject} />
          ) : null}
        </MapContainer>
      </div>
    );
  },
);

PropertyMapExport.displayName = "PropertyMapExport";