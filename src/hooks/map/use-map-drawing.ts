import type L from "leaflet";
import { useMapContext } from "@/state/map/map-context";
import { generateGeoJSON } from "@/utils/geojson";

export const useMapDrawing = () => {
  const { state, dispatch } = useMapContext();

  const handleLocationSelect = (lat: number, lng: number) => {
    dispatch({
      type: "SET_SELECTED_LOCATION",
      payload: { lat, lng },
    });
  };

  const handlePolygonSelect = (polygon: L.Polygon | null) => {
    if (!polygon) {
      dispatch({ type: "SET_POLYGON_COORDINATES", payload: [] });
      dispatch({ type: "SET_POLYGON_GEOJSON", payload: null });
      return;
    }

    const latlngs = polygon.getLatLngs()[0] as L.LatLng[];
    const coordinates = latlngs.map((point) => ({ lat: point.lat, lng: point.lng }));

    dispatch({ type: "SET_POLYGON_COORDINATES", payload: coordinates });
    dispatch({ type: "SET_POLYGON_GEOJSON", payload: generateGeoJSON(coordinates) });
  };

  return {
    selectedLocation: state.selectedLocation,
    polygonCoordinates: state.polygonCoordinates,
    polygonGeoJSON: state.polygonGeoJSON,
    handleLocationSelect,
    handlePolygonSelect,
  };
};
