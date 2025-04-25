import axios from "axios";

export const useGetAllProducts = () => {
  const getAllProducts = async (status: string) => {
    try {
      const products = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/product/getall/${status}`
      );
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
      const product = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/product/get/${_id}`
      );
      return product?.data?.product;
    } catch (error) {
      console.log(error);
    }
  };

  return { getOneProduct };
};
