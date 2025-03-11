import axios from "axios";

export const useCancelCart = () => {
  const cancelCart = async (order_id: string) => {
    try {
      await axios.delete(`/api/order/cancel-order/${order_id}`);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return { cancelCart };
};
