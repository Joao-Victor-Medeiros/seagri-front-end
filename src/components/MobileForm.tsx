
import React, { useState } from 'react';
import { MapPin, User, Mail, Phone, ChevronLeft, ChevronRight, Building2, MapIcon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapComponent } from './MapComponent';

interface FormData {
  // Informações Pessoais
  name: string;
  email: string;
  phone: string;
  cpf: string;

  // Perfil da Produção
  propertyName: string;
  propertySize: string;
  mainCrop: string;
  productionType: string;
  harvestPeriod: string;

  // Endereço Rural Digital
  latitude: number | null;
  longitude: number | null;
  ruralAddress: string;
  municipality: string;
  state: string;
  cep: string;
  additionalInfo: string;
}

interface MobileFormProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

type Step = 'personal' | 'production' | 'location';

export function MobileForm({ onLocationSelect, selectedLocation }: MobileFormProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [formData, setFormData] = useState<FormData>({
    // Informações Pessoais
    name: '',
    email: '',
    phone: '',
    cpf: '',

    // Perfil da Produção
    propertyName: '',
    propertySize: '',
    mainCrop: '',
    productionType: '',
    harvestPeriod: '',

    // Endereço Rural Digital
    latitude: null,
    longitude: null,
    ruralAddress: '',
    municipality: '',
    state: '',
    cep: '',
    additionalInfo: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 'personal':
        return !!(formData.name && formData.email && formData.phone && formData.cpf);
      case 'production':
        return !!(formData.propertyName && formData.propertySize && formData.mainCrop && formData.productionType);
      case 'location':
        return !!(selectedLocation && formData.ruralAddress && formData.municipality && formData.state);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    switch (currentStep) {
      case 'personal':
        setCurrentStep('production');
        break;
      case 'production':
        setCurrentStep('location');
        break;
    }
  };

  const handlePrevious = () => {
    switch (currentStep) {
      case 'production':
        setCurrentStep('personal');
        break;
      case 'location':
        setCurrentStep('production');
        break;
    }
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

  const getStepTitle = () => {
    switch (currentStep) {
      case 'personal':
        return 'Informações Pessoais';
      case 'production':
        return 'Perfil da Produção';
      case 'location':
        return 'Endereço Rural Digital';
      default:
        return '';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 'personal':
        return <User className="h-6 w-6" />;
      case 'production':
        return <Building2 className="h-6 w-6" />;
      case 'location':
        return <MapIcon className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo *</Label>
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
        <Label htmlFor="email">Email *</Label>
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
        <Label htmlFor="phone">Telefone *</Label>
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
        <Label htmlFor="cpf">CPF *</Label>
        <Input
          id="cpf"
          type="text"
          value={formData.cpf}
          onChange={(e) => handleInputChange('cpf', e.target.value)}
          placeholder="000.000.000-00"
          required
        />
      </div>
    </div>
  );

  const renderProductionProfile = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="propertyName">Nome da Propriedade *</Label>
        <Input
          id="propertyName"
          type="text"
          value={formData.propertyName}
          onChange={(e) => handleInputChange('propertyName', e.target.value)}
          placeholder="Nome da sua propriedade rural"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertySize">Tamanho da Propriedade *</Label>
        <Select value={formData.propertySize} onValueChange={(value) => handleInputChange('propertySize', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tamanho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="até-5ha">Até 5 hectares</SelectItem>
            <SelectItem value="5-20ha">5 a 20 hectares</SelectItem>
            <SelectItem value="20-50ha">20 a 50 hectares</SelectItem>
            <SelectItem value="50-100ha">50 a 100 hectares</SelectItem>
            <SelectItem value="mais-100ha">Mais de 100 hectares</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mainCrop">Cultura Principal *</Label>
        <Select value={formData.mainCrop} onValueChange={(value) => handleInputChange('mainCrop', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cultura principal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="soja">Soja</SelectItem>
            <SelectItem value="milho">Milho</SelectItem>
            <SelectItem value="algodao">Algodão</SelectItem>
            <SelectItem value="cana">Cana-de-açúcar</SelectItem>
            <SelectItem value="cafe">Café</SelectItem>
            <SelectItem value="arroz">Arroz</SelectItem>
            <SelectItem value="feijao">Feijão</SelectItem>
            <SelectItem value="frutas">Frutas</SelectItem>
            <SelectItem value="hortalicas">Hortaliças</SelectItem>
            <SelectItem value="pecuaria">Pecuária</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="productionType">Tipo de Produção *</Label>
        <Select value={formData.productionType} onValueChange={(value) => handleInputChange('productionType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de produção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="convencional">Convencional</SelectItem>
            <SelectItem value="organico">Orgânico</SelectItem>
            <SelectItem value="hidroponia">Hidroponia</SelectItem>
            <SelectItem value="agroflorestal">Agroflorestal</SelectItem>
            <SelectItem value="misto">Misto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="harvestPeriod">Período de Colheita</Label>
        <Input
          id="harvestPeriod"
          type="text"
          value={formData.harvestPeriod}
          onChange={(e) => handleInputChange('harvestPeriod', e.target.value)}
          placeholder="Ex: Janeiro a Março"
        />
      </div>
    </div>
  );

  const renderLocationInfo = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ruralAddress">Endereço Rural *</Label>
        <Textarea
          id="ruralAddress"
          value={formData.ruralAddress}
          onChange={(e) => handleInputChange('ruralAddress', e.target.value)}
          placeholder="Endereço completo da propriedade rural"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="municipality">Município *</Label>
          <Input
            id="municipality"
            type="text"
            value={formData.municipality}
            onChange={(e) => handleInputChange('municipality', e.target.value)}
            placeholder="Município"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Estado *</Label>
          <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
            <SelectTrigger>
              <SelectValue placeholder="UF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AC">AC</SelectItem>
              <SelectItem value="AL">AL</SelectItem>
              <SelectItem value="AP">AP</SelectItem>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="BA">BA</SelectItem>
              <SelectItem value="CE">CE</SelectItem>
              <SelectItem value="DF">DF</SelectItem>
              <SelectItem value="ES">ES</SelectItem>
              <SelectItem value="GO">GO</SelectItem>
              <SelectItem value="MA">MA</SelectItem>
              <SelectItem value="MT">MT</SelectItem>
              <SelectItem value="MS">MS</SelectItem>
              <SelectItem value="MG">MG</SelectItem>
              <SelectItem value="PA">PA</SelectItem>
              <SelectItem value="PB">PB</SelectItem>
              <SelectItem value="PR">PR</SelectItem>
              <SelectItem value="PE">PE</SelectItem>
              <SelectItem value="PI">PI</SelectItem>
              <SelectItem value="RJ">RJ</SelectItem>
              <SelectItem value="RN">RN</SelectItem>
              <SelectItem value="RS">RS</SelectItem>
              <SelectItem value="RO">RO</SelectItem>
              <SelectItem value="RR">RR</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="SP">SP</SelectItem>
              <SelectItem value="SE">SE</SelectItem>
              <SelectItem value="TO">TO</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <Input
          id="cep"
          type="text"
          value={formData.cep}
          onChange={(e) => handleInputChange('cep', e.target.value)}
          placeholder="00000-000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="map">Localização no Mapa *</Label>
        <MapComponent onLocationSelect={onLocationSelect} selectedLocation={selectedLocation} />
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

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Informações Adicionais</Label>
        <Textarea
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
          placeholder="Informações complementares sobre a propriedade"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card rounded-lg p-4 md:p-6 shadow-lg border">
        {/* Header com título e progresso */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              {getStepIcon()}
              {getStepTitle()}
            </h2>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${currentStep === 'personal' ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-2 h-2 rounded-full ${currentStep === 'production' ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-2 h-2 rounded-full ${currentStep === 'location' ? 'bg-primary' : 'bg-muted'}`} />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Conteúdo da etapa atual */}
          {currentStep === 'personal' && renderPersonalInfo()}
          {currentStep === 'production' && renderProductionProfile()}
          {currentStep === 'location' && renderLocationInfo()}

          {/* Botões de navegação */}
          <div className="flex flex-col sm:flex-row justify-between pt-4 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 'personal'}
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            {currentStep === 'location' ? (
              <Button
                type="submit"
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
                disabled={!validateStep(currentStep)}
              >
                <CheckCircle className="h-4 w-4" />
                Enviar Formulário
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
