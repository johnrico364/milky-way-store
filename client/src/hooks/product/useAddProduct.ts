import axios from "axios";
import { useState } from "react";

export const useAddProduct = () => {
  const [exception, set_exception] = useState<string>("");

  const addProductAPI = async (newProduct: any) => {
    try {
      const product = await axios.post("/api/product/create", newProduct);
      console.log(product);

      return { response: true, message: "Product Created Successfully!" };
    } catch (error: any) {
      set_exception(error.response.data.error);
    }
  };

  return { addProductAPI, exception, set_exception };
};
