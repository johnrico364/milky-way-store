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

export const useGetOneProduct = () => {
  const getOneProduct = async (_id: any) => {
    try {
      const product = await axios.get(`/api/product/get/${_id}`);
      return product?.data?.product;
    } catch (error) {
      console.log(error);
    }
  };

  return { getOneProduct };
};