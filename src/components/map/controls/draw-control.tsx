import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";

interface DrawControlProps {
  onPolygonSelect: (polygon: L.Polygon | null) => void;
}

export const DrawControl = ({ onPolygonSelect }: DrawControlProps) => {
  const map = useMap();
  const controlRef = useRef<L.Control.Draw | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);

  useEffect(() => {
    if (!map) {
      return;
    }

    // Create feature group only once
    if (!drawnItemsRef.current) {
      drawnItemsRef.current = new L.FeatureGroup();
      map.addLayer(drawnItemsRef.current);
    }

    // Create and add control only once
    if (!controlRef.current) {
      controlRef.current = new L.Control.Draw({
        position: "topright",
        draw: {
          polygon: {
            allowIntersection: false,
            drawError: {
              color: "#e1e100",
              message: "<strong>Erro:</strong> nao e possivel desenhar linhas que se cruzam!",
            },
            shapeOptions: {
              color: "#24aa72ff",
            },
          },
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false,
          rectangle: false,
        },
        edit: {
          featureGroup: drawnItemsRef.current,
          remove: true,
        },
      });

      map.addControl(controlRef.current);
      (map as any).drawControl = controlRef.current;
    }

    const syncPolygonSelection = () => {
      const layers = drawnItemsRef.current?.getLayers() ?? [];
      const polygons = layers.filter((layer): layer is L.Polygon => layer instanceof L.Polygon);

      if (polygons.length === 0) {
        onPolygonSelect(null);
        return;
      }

      onPolygonSelect(polygons[polygons.length - 1]);
    };

    const handleCreated = (event: L.DrawEvents.Created) => {
      console.log("Draw created:", event.layerType);
      if (event.layerType === "polygon" && drawnItemsRef.current) {
        drawnItemsRef.current.addLayer(event.layer);
        syncPolygonSelection();
      }
    };

    const handleEdited = (_event: L.DrawEvents.Edited) => {
      console.log("Draw edited");
      syncPolygonSelection();
    };

    const handleDeleted = (_event: L.DrawEvents.Deleted) => {
      console.log("Draw deleted");
      syncPolygonSelection();
    };

    map.on(L.Draw.Event.CREATED, handleCreated);
    map.on(L.Draw.Event.EDITED, handleEdited);
    map.on(L.Draw.Event.DELETED, handleDeleted);

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated);
      map.off(L.Draw.Event.EDITED, handleEdited);
      map.off(L.Draw.Event.DELETED, handleDeleted);
    };
  }, [map, onPolygonSelect]);

  return null;
};
