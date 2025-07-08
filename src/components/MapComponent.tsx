
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

export function MapComponent({ onLocationSelect, selectedLocation }: MapComponentProps) {
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
        
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <div className="text-center">
                <p className="font-medium">Localização Selecionada</p>
                <p className="text-sm text-gray-600">
                  {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
