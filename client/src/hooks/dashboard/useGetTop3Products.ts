import axios from "axios";

export const useGetTop3Products = () => {
  const getTop3Products = async () => {
    try {
      const salesData = await axios.get(
        "/api/order/dashboard/get-top3-products"
      );

      return salesData.data
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  };

  return { getTop3Products };
};
