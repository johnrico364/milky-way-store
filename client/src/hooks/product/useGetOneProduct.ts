import axios from "axios";

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
