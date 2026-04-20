import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";

interface DrawControlProps {
  onPolygonSelect: (polygon: L.Polygon | null) => void;
}

export const DrawControl = ({ onPolygonSelect }: DrawControlProps) => {
  const map = useMap();
  const drawnFlagRef = useRef(false);
  const controlRef = useRef<L.Control.Draw | null>(null);

  useEffect(() => {
    if (!map) {
      return;
    }

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
          featureGroup: L.featureGroup().addTo(map),
          remove: true,
        },
      });

      map.addControl(controlRef.current);
    }

    const handleCreated = (event: L.DrawEvents.Created) => {
      if (drawnFlagRef.current) {
        return;
      }

      if (event.layerType === "polygon") {
        map.addLayer(event.layer);
        drawnFlagRef.current = true;
        onPolygonSelect(event.layer as L.Polygon);
      }
    };

    const handleEdited = (event: L.DrawEvents.Edited) => {
      event.layers.eachLayer((layer: L.Layer) => {
        onPolygonSelect(layer as L.Polygon);
      });
    };

    const handleDeleted = () => {
      onPolygonSelect(null);
      drawnFlagRef.current = false;
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
