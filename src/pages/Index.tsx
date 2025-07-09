
import React, { useState } from 'react';
import { MobileForm } from '@/components/MobileForm';
import { MapComponent } from '@/components/MapComponent';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Formulário de cadastro do agricultor
          </h1>
          <p className="text-muted-foreground">
            Seagri - DF
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <MobileForm
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
