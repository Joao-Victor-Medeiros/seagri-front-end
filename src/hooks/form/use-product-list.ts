import { useFormContext } from "@/state/form/form-context";
import { DEFAULT_PRODUCT } from "@/utils/constants";

export const useProductList = () => {
  const { dispatch } = useFormContext();

  const addProduct = () => {
    dispatch({ type: "ADD_PRODUCT", payload: { ...DEFAULT_PRODUCT } });
  };

  const removeProduct = (index: number) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: index });
  };

  const updateProduct = (
    index: number,
    field: "name" | "expiry" | "quantity" | "unit" | "price",
    value: string,
  ) => {
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { index, field, value },
    });
  };

  return {
    addProduct,
    removeProduct,
    updateProduct,
  };
};
