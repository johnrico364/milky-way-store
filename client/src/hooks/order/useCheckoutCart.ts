import axios from "axios";

export const useCheckoutCart = () => {
  const checkoutCart = async (cart_id: any) => {
    try {
      const orders = await axios.post("/api/order/checkout-cart", cart_id);
      return { status: true, response: orders?.data?.response };
    } catch (error) {
      console.log(error);
    }
  };

  return { checkoutCart };
};
