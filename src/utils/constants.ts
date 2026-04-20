import type { FarmerFormData, ProductItem } from "@/interfaces/form.interface";

export const INITIAL_STEP = "personal" as const;

export const DEFAULT_PRODUCT: ProductItem = {
  name: "",
  expiry: "",
  quantity: "0",
  unit: "Kg",
  price: "0",
};

export const INITIAL_FORM_DATA: FarmerFormData = {
  name: "",
  email: "",
  phone: "",
  cpf: "",
  propertySize: "",
  productionType: "",
  mainCrop: "",
  secCrop: "",
  secCropOther: "",
  benefitProgram: "",
  products: [],
  municipality: "",
  state: "",
  cep: "",
  propertyName: "",
  latitude: null,
  longitude: null,
};

export const DEFAULT_USER_LOCATION = {
  lat: -15.7939,
  lng: -47.8828,
};
