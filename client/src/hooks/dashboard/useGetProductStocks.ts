import axios from "axios";

export const useGetProductStocks = () => {
  const getProductStocks = async () => {
    try {
      const product = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/order/dashboard/get-stocks`
      );

      return product?.data;
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  };

  return { getProductStocks };
};
