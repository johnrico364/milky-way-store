import { useQuery } from "@tanstack/react-query";
import { CartedProducts } from "../../components/CartedProducts";
import { useGetAllCarts } from "../../hooks/order/useGetAllCarts";
import { useParseToken } from "../../hooks/user/useParseToken";
import { useState } from "react";
import { useCheckoutCart } from "../../hooks/order/useCheckoutCart";
import { useNavigate } from "react-router-dom";
import { FaCircleCheck, FaXmark } from "react-icons/fa6";

export const Cart = () => {
  const navigate = useNavigate();
  const formatter = new Intl.NumberFormat("en").format;

  const { getAllCarts } = useGetAllCarts();
  const { parseToken } = useParseToken();
  const { checkoutCart } = useCheckoutCart();

  const [cartData, set_cartData] = useState<any>([]);
  const [checkOut, set_checkOut] = useState<string[]>([]);
  const [totalPayment, set_totalPayment] = useState<number>(0);
  const [checkOutMessage, set_checkOutMessage] = useState<string>("");

  const effectCart = async () => {
    const userData = await parseToken();
    const carts = await getAllCarts(userData?._id);
    set_cartData(carts);

    return true;
  };
  useQuery({
    queryKey: ["carts"],
    queryFn: effectCart,
  });

  const addCheckOutFn = (
    cartId: string,
    cartPayment: number,
    isChecked: boolean
  ) => {
    if (isChecked) {
      set_checkOut((prev: any) => [...prev, cartId]);
      set_totalPayment(totalPayment + cartPayment);
    } else {
      set_checkOut((prev: any) => prev.filter((id: any) => id !== cartId));
      set_totalPayment(totalPayment - cartPayment);
    }
  };

  const toCheckOutFn = async () => {
    if (checkOut.length > 0) {
      const response = await checkoutCart(checkOut);
      response?.status && set_checkOutMessage(response?.response);
    } else {
      alert("!! No order selected");
    }
  };

  return (
    <div className="cart-container">
      {checkOutMessage !== "" && (
        <div className="mt-3 mx-3 text-white font-semibold alert alert-success">
          <FaCircleCheck className="text-2xl" />
          <span>Your purchase has been confirmed!</span>
          <button onClick={() => navigate("/user/profile")}>
            <FaXmark className="text-2xl" />
          </button>
        </div>
      )}

      <div className="product-container">
        {cartData?.map((cart: any) => {
          return (
            <div className="flex flex-wrap">
              <div className="basis-10/12 lg:px-10 mb-5">
                <CartedProducts data={cart} />
              </div>
              <div className="basis-1/12 text-end lg:pe-5 pt-5">
                <div
                  className="font-semibold cursor-pointer underline underline-offset-2"
                  onClick={() => navigate(`/user/edit-carted-products/${cart?._id}`)}
                >
                  Edit
                </div>
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={(e) =>
                    addCheckOutFn(cart?._id, cart?.payment, e.target.checked)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="payment-container flex items-center">
        <div className="basis-1/2 color-2nd-1">
          Payment: ₱ {formatter(totalPayment)}
        </div>
        <div className="basis-1/2 text-end lg:pe-5 pe-2">
          <button className="button" onClick={toCheckOutFn}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};
