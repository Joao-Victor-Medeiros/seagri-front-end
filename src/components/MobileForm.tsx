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
  // Informações Pessoais (Etapa 1)
  name: string;
  email: string;
  phone: string;
  cpf: string;

  // Perfil da Produção (Etapa 2)
  propertySize: string;
  productionType: string;
  mainCrop: string;
  secCrop: string;
  secCropOther: string;
  benefitProgram: string;

  // Produtos (Etapa 2)
  products: {
    name: string;
    quantity: string;
    unit: string;
    price: string;
    harvestSeason: string;
  }[];

  // Endereço Rural Digital (Etapa 3)
  ruralAddress: string;
  municipality: string;
  state: string;
  cep: string;
  additionalInfo: string;
  latitude: number | null;
  longitude: number | null;
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
    // Informações Pessoais (Etapa 1)
    name: '',
    email: '',
    phone: '',
    cpf: '',

    // Perfil da Produção (Etapa 2)
    propertySize: '',
    productionType: '',
    mainCrop: '',
    secCrop: '',
    secCropOther: '',
    benefitProgram: '',

    // Produtos (Etapa 2)
    products: [],

    // Endereço Rural Digital (Etapa 3)
    ruralAddress: '',
    municipality: '',
    state: '',
    cep: '',
    additionalInfo: '',
    latitude: null,
    longitude: null
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, {
        name: '',
        quantity: '',
        unit: 'kg',
        price: '',
        harvestSeason: ''
      }]
    }));
  };

  const removeProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const updateProduct = (index: number, field: keyof FormData['products'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      )
    }));
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 'personal':
        return !!(formData.name && formData.email && formData.phone && formData.cpf);
      case 'production':
        return !!(formData.propertySize && formData.mainCrop && formData.productionType);
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

    // Organizando dados por ordem de preenchimento
    const submitData = {
      // Etapa 1: Informações Pessoais
      informacoesPessoais: {
        nome: formData.name,
        email: formData.email,
        telefone: formData.phone,
        cpf: formData.cpf
      },

      // Etapa 2: Perfil da Produção
      perfilProducao: {
        tamanhoPropriedade: formData.propertySize,
        regimeProducao: formData.productionType,
        seguimentoPrincipal: formData.mainCrop,
        seguimentoSecundario: formData.secCrop || null,
        programaSeagri: formData.benefitProgram || null,
        produtos: formData.products.map(product => ({
          nome: product.name,
          quantidade: product.quantity,
          unidade: product.unit,
          preco: product.price,
          safra: product.harvestSeason
        }))
      },

      // Etapa 3: Endereço Rural Digital
      enderecoRural: {
        endereco: formData.ruralAddress,
        municipio: formData.municipality,
        estado: formData.state,
        cep: formData.cep || null,
        nomePropriedade: formData.additionalInfo || null,
        coordenadas: {
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng
        }
      }
    };

    console.log('Formulário enviado:', submitData);

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
        <Label htmlFor="propertySize">Área dedicada (hectares) *</Label>
        <Input
          id="propertySize"
          type="number"
          value={formData.propertySize}
          onChange={(e) => handleInputChange('propertySize', e.target.value)}
          placeholder="Ex: 5.5"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productionType">Regime de produção *</Label>
        <Select value={formData.productionType} onValueChange={(value) => handleInputChange('productionType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de produção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="familiar">Familiar</SelectItem>
            <SelectItem value="organico">Orgânico</SelectItem>
            <SelectItem value="pequeno-produtor">Pequeno produtor</SelectItem>
            <SelectItem value="agroecologica">Agroecológica</SelectItem>
            <SelectItem value="misto">Misto</SelectItem>
            <SelectItem value="convencional">Convencional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mainCrop">Seguimento Principal *</Label>
        <Select value={formData.mainCrop} onValueChange={(value) => handleInputChange('mainCrop', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cultura principal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hortalicas">Hortaliças</SelectItem>
            <SelectItem value="floricultura">Floricultura</SelectItem>
            <SelectItem value="graos">Grãos</SelectItem>
            <SelectItem value="cafeicultura">Cafeicultura</SelectItem>
            <SelectItem value="apículas">Apículas</SelectItem>
            <SelectItem value="laticínios">Laticínios</SelectItem>
            <SelectItem value="aveicultura">Aveicultura</SelectItem>
            <SelectItem value="suinocultura">Suinocultura</SelectItem>
            <SelectItem value="bovino">Bovinocultura</SelectItem>
            <SelectItem value="ovinocultura">Ovinocultura</SelectItem>
            <SelectItem value="fruticultura">Fruticultura</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="secCrop">Seguimento secundário</Label>
        <Select value={formData.secCrop} onValueChange={(value) => handleInputChange('secCrop', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cultura secundária" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hortalicas">Hortaliças</SelectItem>
            <SelectItem value="floricultura">Floricultura</SelectItem>
            <SelectItem value="graos">Grãos</SelectItem>
            <SelectItem value="cafeicultura">Cafeicultura</SelectItem>
            <SelectItem value="apículas">Apículas</SelectItem>
            <SelectItem value="laticínios">Laticínios</SelectItem>
            <SelectItem value="aveicultura">Aveicultura</SelectItem>
            <SelectItem value="suinocultura">Suinocultura</SelectItem>
            <SelectItem value="bovino">Bovinocultura</SelectItem>
            <SelectItem value="ovinocultura">Ovinocultura</SelectItem>
            <SelectItem value="fruticultura">Fruticultura</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
        {formData.secCrop === 'outros' && (
          <Input
            id="secCropOther"
            type="text"
            value={formData.secCropOther}
            onChange={(e) => handleInputChange('secCropOther', e.target.value)}
            placeholder="Especifique o seguimento secundário"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="products">Produtos de retorno</Label>
        <div className="space-y-4">
          {formData.products.map((product, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Produto {index + 1}
                </h3>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeProduct(index)}
                  className="ml-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`productName_${index}`}>Nome do Produto *</Label>
                  <Input
                    id={`productName_${index}`}
                    type="text"
                    value={product.name}
                    onChange={(e) => updateProduct(index, 'name', e.target.value)}
                    placeholder="Nome do produto"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`productQuantity_${index}`}>Quantidade *</Label>
                  <Input
                    id={`productQuantity_${index}`}
                    type="number"
                    value={product.quantity}
                    onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                    placeholder="Ex: 100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`productUnit_${index}`}>Unidade *</Label>
                  <Select value={product.unit} onValueChange={(value) => updateProduct(index, 'unit', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Quilogramas (kg)</SelectItem>
                      <SelectItem value="g">Gramas (g)</SelectItem>
                      <SelectItem value="l">Litros (L)</SelectItem>
                      <SelectItem value="m">Metros (m)</SelectItem>
                      <SelectItem value="un">Unidades (un)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`productPrice_${index}`}>Preço *</Label>
                  <Input
                    id={`productPrice_${index}`}
                    type="text"
                    value={product.price}
                    onChange={(e) => updateProduct(index, 'price', e.target.value)}
                    placeholder="Preço por unidade"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`productHarvestSeason_${index}`}>Safra/Período produção</Label>
                  <Input
                    id={`productHarvestSeason_${index}`}
                    type="text"
                    value={product.harvestSeason}
                    onChange={(e) => updateProduct(index, 'harvestSeason', e.target.value)}
                    placeholder="Ex: 2023/2024"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={addProduct}
            className="w-full sm:w-auto"
          >
            Adicionar
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="benefitProgram">Escolha o programa ao qual você participa na Seagri</Label>
        <Select
          value={formData.benefitProgram}
          onValueChange={(value) => handleInputChange("benefitProgram", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o benefício" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desconheco">Desconheço os programas</SelectItem>
            <SelectItem value="papa">PAPA</SelectItem>
            <SelectItem value="paa">PAA</SelectItem>
            <SelectItem value="doacao-insumos">Doação de Insumos</SelectItem>
            <SelectItem value="fomento-eventos">Fomento em eventos</SelectItem>
            <SelectItem value="pro-rural">PRO-RURAL</SelectItem>
            <SelectItem value="reflorestar">Reflorestar – Doação de Mudas Nativas</SelectItem>
            <SelectItem value="alevinar">Alevinar – Doação de alevinos</SelectItem>
            <SelectItem value="rota-fruticultura">Rota da Fruticultura</SelectItem>
            <SelectItem value="porteira-pra-dentro">Serviços de maquinário – "Porteira Pra Dentro"</SelectItem>
            <SelectItem value="produtor-agua">Produtor de Água – Pagamento por Serviços Ambientais</SelectItem>
            <SelectItem value="cessao-maquinas">Cessão de uso de máquinas agrícolas</SelectItem>
            <SelectItem value="fdr">FDR – Fundo de Desenvolvimento Rural</SelectItem>
            <SelectItem value="dcaa">DCAA – Declaração de Conformidade de Atividade Agropecuária</SelectItem>
            <SelectItem value="outros">Outro(s) detalhar a seguir</SelectItem>
          </SelectContent>
        </Select>
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

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Nome da propiedade</Label>
        <Textarea
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
          placeholder="Inserir nome do espaço ou propiedade rural"
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
