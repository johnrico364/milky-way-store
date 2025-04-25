import axios from "axios";

export const useOrderProduct = () => {
  const orderOneProduct = async (newOrder: any) => {
    try {
      const order = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/order/new-order`,
        newOrder
      );

      return { data: order?.data, success: true };
    } catch (error: any) {
      console.log(error?.response?.data);
      alert(error?.response?.data);
    }
  };

  return { orderOneProduct };
};
