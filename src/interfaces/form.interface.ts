export type FormStep = "personal" | "production" | "location";

export interface ProductItem {
  name: string;
  expiry: string;
  quantity: string;
  unit: string;
  price: string;
}

export interface FarmerFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  propertySize: string;
  productionType: string;
  mainCrop: string;
  secCrop: string;
  secCropOther: string;
  benefitProgram: string;
  products: ProductItem[];
  municipality: string;
  state: string;
  cep: string;
  propertyName: string;
  latitude: number | null;
  longitude: number | null;
}
