import axios from "axios";

export const useUpdateOrderStatus = () => {
  const updateOrderStatus = async (status: string, order: any) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/order/update-status`,
        { status, order }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { updateOrderStatus };
};

export const useUpdateDeliveryStatus = () => {
  const updateDeliveryStatus = async (order_id: string) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/order/update/delivery-status`,
        { order_id }
      );
    } catch (error) {}
  };

  return { updateDeliveryStatus };
};
