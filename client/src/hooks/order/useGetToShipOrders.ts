import axios from "axios";

export const useGetToShipOrders = () => {
  const getToShipOrders = async () => {
    try {
      const orders = await axios.get("/api/order/to-ship");
      return orders?.data?.orders
    } catch (error) {
        console.log(error)
    }
  };

  return { getToShipOrders };
};
