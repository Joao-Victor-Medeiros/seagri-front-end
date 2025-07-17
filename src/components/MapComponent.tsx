import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

// Fix para ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
  onPolygonSelect?: (polygon: L.Polygon) => void;
  selectedPolygon?: L.Polygon | null;
}

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
}

function DrawControl({ onPolygonSelect }: { onPolygonSelect?: (polygon: L.Polygon) => void }) {
  const map = useMap();
  const drawnItemsRef = useRef<boolean>(false);

  useEffect(() => {
    // Configurar controles de desenho
    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: '#e1e100', // Color the shape will turn when intersects
            message: '<strong>Erro:</strong> não é possível desenhar linhas que se cruzam!' // Message that will show when intersect
          },
          shapeOptions: {
            color: '#24aa72ff'
          }
        },
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
        rectangle: false
      },
      edit: {
        featureGroup: L.featureGroup().addTo(map), // REQUIRED!!
        remove: true
      }
    });

    map.addControl(drawControl);

    // Event listeners para desenho
    map.on(L.Draw.Event.CREATED, (e: any) => {
      if (drawnItemsRef.current) return; // impede múltiplos

      const { layerType, layer } = e;

      if (layerType === 'polygon') {
        map.addLayer(layer); // mostra no mapa

        const latlngs = layer.getLatLngs()[0]; // pega os pontos
        const vertices = latlngs.map((point: L.LatLng) => [point.lat, point.lng]);

        console.log('Coordenadas do polígono:', vertices);
        drawnItemsRef.current = true;
      }
    });

    map.on(L.Draw.Event.EDITED, (e: any) => {
      const layers = e.layers;
      layers.eachLayer((layer: L.Polygon) => {
        if (onPolygonSelect) {
          onPolygonSelect(layer);
        }
      });
    });

    map.on(L.Draw.Event.DELETED, (e: any) => {
      if (onPolygonSelect) {
        onPolygonSelect(null as any);
      }
    });

    // Cleanup
    return () => {
      map.removeControl(drawControl);
    };
  }, [map, onPolygonSelect]);

  return null;
}

export function MapComponent({ onLocationSelect, selectedLocation, onPolygonSelect }: MapComponentProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Obter localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.warn('Erro ao obter localização:', error);
          // Localização padrão (Distrito Federal - Brasília)
          setUserLocation({ lat: -15.7939, lng: -47.8828 });
        }
      );
    } else {
      // Localização padrão (Distrito Federal - Brasília)
      setUserLocation({ lat: -15.7939, lng: -47.8828 });
    }
  }, []);

  if (!userLocation) {
    return (
      <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] rounded-lg overflow-hidden border shadow-lg">
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onLocationSelect={onLocationSelect} />
        <DrawControl onPolygonSelect={onPolygonSelect} />
      </MapContainer>
    </div>
  );
}
