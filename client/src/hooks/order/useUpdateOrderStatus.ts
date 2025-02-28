import axios from "axios";

export const useUpdateOrderStatus = () => {
  const updateOrderStatus = async (status: string, order: any) => {
    try {
      await axios.patch("/api/order/update-status", { status, order });
    } catch (error) {
      console.log(error);
    }
  };

  return { updateOrderStatus };
};
