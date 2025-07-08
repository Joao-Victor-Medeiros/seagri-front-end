
import React, { useState } from 'react';
import { MobileForm } from '@/components/MobileForm';
import { MapComponent } from '@/components/MapComponent';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Formulário com Mapa
          </h1>
          <p className="text-muted-foreground">
            Preencha seus dados e selecione sua localização no mapa
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <MobileForm 
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="sticky top-4">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Selecione sua localização
              </h3>
              <MapComponent 
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
