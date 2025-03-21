import axios from "axios";

export const useGetProductStocks = () => {
  const getProductStocks = async () => {
    try {
      const product = await axios.get("/api/order/dashboard/get-stocks");
      
      return product?.data
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  };

  return { getProductStocks };
};
