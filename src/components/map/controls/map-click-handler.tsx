import { useMapEvents } from "react-leaflet";

interface MapClickHandlerProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export const MapClickHandler = ({ onLocationSelect }: MapClickHandlerProps) => {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      onLocationSelect(lat, lng);
    },
  });

  return null;
};
