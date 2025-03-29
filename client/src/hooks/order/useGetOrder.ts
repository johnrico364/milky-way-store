import axios from "axios";

// User Side | Profile
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

// User Side | Cart
export const useGetAllCarts = () => {
  const getAllCarts = async (ordered_by: string) => {
    try {
      const carts = await axios.get(`/api/order/cart/${ordered_by}`);
      return carts?.data?.carts;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllCarts };
};

// Admin Side | Orders
export const useGetPendingOrDeliveryOrders = () => {
  const getPendingOrDeliveryOrders = async (status: string) => {
    try {
      const orders = await axios.get(
        `/api/order/getall-by-status/${status}`
      );
      return orders?.data?.orders;
    } catch (error) {
      console.log(error);
    }
  };

  return { getPendingOrDeliveryOrders };
};
