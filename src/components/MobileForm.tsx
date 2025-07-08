
import React, { useState } from 'react';
import { MapPin, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
}

interface MobileFormProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

export function MobileForm({ onLocationSelect, selectedLocation }: MobileFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    latitude: null,
    longitude: null,
    address: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      toast({
        title: "Localização necessária",
        description: "Por favor, selecione uma localização no mapa.",
        variant: "destructive"
      });
      return;
    }

    const submitData = {
      ...formData,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };

    console.log('Form submitted:', submitData);
    
    toast({
      title: "Formulário enviado!",
      description: "Seus dados foram enviados com sucesso.",
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg border">
      <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
        <User className="h-6 w-6" />
        Informações Pessoais
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Seu nome completo"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(11) 99999-9999"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Seu endereço completo"
            required
          />
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Localização Selecionada</span>
          </div>
          {selectedLocation ? (
            <p className="text-sm text-muted-foreground">
              Lat: {selectedLocation.lat.toFixed(6)}, 
              Lng: {selectedLocation.lng.toFixed(6)}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Clique no mapa para selecionar uma localização
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={!selectedLocation}
        >
          Enviar Formulário
        </Button>
      </form>
    </div>
  );
}
