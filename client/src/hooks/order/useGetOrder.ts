import axios from "axios";

// User Side | Profile
export const useGetUserOrderByStatus = () => {
  const getUserOrder = async (ordered_by: string, status: string) => {
    try {
      const order = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/order/get-by-status`,
        {
          ordered_by,
          status,
        }
      );

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
      const carts = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/order/cart/${ordered_by}`
      );
      return carts?.data?.carts;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllCarts };
};

// Admin Side | Orders
export const useGetAllOrdersByStatus = () => {
  const getAllOrdersByStatus = async (status: string) => {
    try {
      const orders = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/order/getall-by-status/${status}`
      );
      return orders?.data?.orders;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllOrdersByStatus };
};

// Admin Side | Users
export const useGetUserOrdersTransaction = () => {
  const getUserOrdersTransaction = async (user_id: string) => {
    try {
      const orders = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/order/transaction/${user_id}`
      );
      return orders.data.orders;
    } catch (error) {
      console.log(error);
    }
  };

  return { getUserOrdersTransaction };
};
