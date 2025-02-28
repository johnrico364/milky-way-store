import axios from "axios";

export const useGetUserOrderByStatus = () => {
  const getUserOrder = async (ordered_by: string, status: string) => {
    try {
      const order = await axios.post(`/api/order/get-by-status`, {
        ordered_by,
        status,
      });

      return order?.data?.orders;
    } catch (error) {
      console.log(error);
    }
  };

  return { getUserOrder };
};
