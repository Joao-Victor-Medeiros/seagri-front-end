import type { FormState } from "@/interfaces/state.interface";
import { DEFAULT_PRODUCT } from "@/utils/constants";
import type { FormAction } from "./form-actions";

export const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.payload,
      };
    case "SET_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value,
        },
      };
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        formData: {
          ...state.formData,
          products: [...state.formData.products, action.payload ?? DEFAULT_PRODUCT],
        },
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        formData: {
          ...state.formData,
          products: state.formData.products.filter((_, i) => i !== action.payload),
        },
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        formData: {
          ...state.formData,
          products: state.formData.products.map((product, i) => {
            if (i !== action.payload.index) {
              return product;
            }

            return {
              ...product,
              [action.payload.field]: action.payload.value,
            };
          }),
        },
      };
    default:
      return state;
  }
};
