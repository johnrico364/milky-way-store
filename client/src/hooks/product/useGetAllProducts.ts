import axios from "axios";

export const useGetAllProducts = () => {
  const getAllProducts = async () => {
    try {
      const products = await axios.get("/api/product/getall");
      return products.data.products;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllProducts };
};
