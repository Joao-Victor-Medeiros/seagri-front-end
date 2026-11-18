import { MapContainer, TileLayer } from "react-leaflet";
import type { Ref } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useMapDrawing } from "@/hooks/map/use-map-drawing";
import { useUserGeolocation } from "@/hooks/map/use-user-geolocation";
import { MapClickHandler } from "./controls/map-click-handler";
import { DrawControl } from "./controls/draw-control";
import { PropertyMapExport } from "./property-map-export";
import type { MapCaptureHandle } from "@/hooks/map/use-property-report";
import { useMapContext } from "@/state/map/map-context";
import styles from "./map.module.css";

delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export const MapComponent = ({ captureRef }: { captureRef?: Ref<MapCaptureHandle> }) => {
  const { userLocation } = useUserGeolocation();
  const { handleLocationSelect, handlePolygonSelect } = useMapDrawing();
  const { state: mapState } = useMapContext();

  if (!userLocation) {
    return <div className={styles.loading}>Carregando mapa...</div>;
  }

  return (
    <div className={styles.container}>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        preferCanvas
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          crossOrigin="anonymous"
        />
        <MapClickHandler onLocationSelect={handleLocationSelect} />
        <DrawControl onPolygonSelect={handlePolygonSelect} />
      </MapContainer>
      <PropertyMapExport
        ref={captureRef}
        center={[userLocation.lat, userLocation.lng]}
        polygon={mapState.polygonGeoJSON}
      />
    </div>
  );
};
