import type { FarmerFormData, FormStep, ProductItem } from "@/interfaces/form.interface";

export type FormAction =
  | { type: "SET_STEP"; payload: FormStep }
  | { type: "SET_FIELD"; payload: { field: keyof FarmerFormData; value: string } }
  | { type: "SET_FORM_DATA"; payload: FarmerFormData }
  | { type: "ADD_PRODUCT"; payload: ProductItem }
  | { type: "REMOVE_PRODUCT"; payload: number }
  | {
      type: "UPDATE_PRODUCT";
      payload: {
        index: number;
        field: keyof ProductItem;
        value: string;
      };
    };
