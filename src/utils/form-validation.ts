import type { FarmerFormData, FormStep } from "@/interfaces/form.interface";
import type { LatLngPoint } from "@/interfaces/map.interface";

const EXPIRY_DATE_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/;

export const formatExpiryDateInput = (value: string): string => {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 8);

  if (digitsOnly.length <= 2) {
    return digitsOnly;
  }

  if (digitsOnly.length <= 4) {
    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
  }

  return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4)}`;
};

export const getExpiryInputValidationMessage = (value: string): string | null => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  if (normalizedValue.length < 10) {
    return "Informe a validade no formato dd/mm/aaaa.";
  }

  const parsedDate = parseBrazilianDate(normalizedValue);

  if (!parsedDate) {
    return "Informe a validade no formato dd/mm/aaaa.";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate < today) {
    return "A validade nao pode ser anterior a data de hoje.";
  }

  return null;
};

const parseBrazilianDate = (value: string): Date | null => {
  if (!EXPIRY_DATE_PATTERN.test(value)) {
    return null;
  }

  const [dayRaw, monthRaw, yearRaw] = value.split("/");
  const day = Number(dayRaw);
  const month = Number(monthRaw);
  const year = Number(yearRaw);

  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return null;
  }

  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate;
};

export const getProductExpiryValidationError = (formData: FarmerFormData): string | null => {
  for (let index = 0; index < formData.products.length; index += 1) {
    const product = formData.products[index];

    if (!product.expiry) {
      continue;
    }

    const expiryError = getExpiryInputValidationMessage(product.expiry);

    if (expiryError) {
      return `Produto ${index + 1}: ${expiryError}`;
    }
  }

  return null;
};

export const validateStep = (
  step: FormStep,
  formData: FarmerFormData,
  selectedLocation: LatLngPoint | null,
): boolean => {
  switch (step) {
    case "personal":
      return !!(
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.cpf
      );
    case "production":
      return !!(
        formData.propertySize &&
        formData.mainCrop &&
        formData.productionType
      );
    case "location":
      return !!(
        selectedLocation &&
        formData.propertyName &&
        formData.municipality &&
        formData.state
      );
    default:
      return false;
  }
};
