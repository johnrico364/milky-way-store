import {
  FaCalendarCheck,
  FaFaceSmileBeam,
  FaMinus,
  FaPlus,
  FaTruck,
} from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneProduct } from "../../hooks/product/useGetOneProduct";
import { useState } from "react";
import { useOrderProduct } from "../../hooks/order/useOrderProduct";
import { useQuery } from "@tanstack/react-query";
import { useParseToken } from "../../hooks/user/useParseToken";

interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  picture: string;
}

export const OrderProduct = () => {
  const formatter = new Intl.NumberFormat("en").format;
  const navigate = useNavigate();
  const { details } = useParams();
  const _id = details?.split("-")[1];

  const { getOneProduct } = useGetOneProduct();
  const { orderOneProduct } = useOrderProduct();
  const { parseToken } = useParseToken();

  const [productData, set_productData] = useState<ProductData>();
  const [quantity, set_quantity] = useState<number>(1);
  const [userId, set_userId] = useState<string>("");

  const effectprod = async () => {
    try {
      // Get Product Details
      const prodData = await getOneProduct(_id);
      set_productData(prodData);

      // Get User ID
      const userData = await parseToken();
      set_userId(userData?._id);

      return true;
    } catch (error) {}
  };

  useQuery({
    queryKey: ["getData"],
    queryFn: effectprod,
    refetchInterval: 2000,
  });

  const handleOrder = async (isCarted: boolean) => {
    const orderForm = {
      ordered_by: userId,
      product: productData?._id,
      quantity: quantity,
      payment: productData?.price ? productData?.price * quantity : 0,
      isCarted: isCarted,
    };
    const response = await orderOneProduct(orderForm);

    response?.success && navigate(`/user/${response?.data?.response}`);
  };

  return (
    <div className="order-product-container">
      <div className="lg:basis-8/12 basis-11/12 mt-5">
        <div className="flex flex-wrap justify-center">
          <div className="lg:basis-5/12 basis-11/12 max-sm:w-72 p-3">
            <img
              className="w-96 bg-cover"
              src={
                productData?.picture
                  ? require(`../../images/product/${productData?.picture}`)
                  : ""
              }
              alt="product"
            />
          </div>
          <div className="lg:basis-7/12 basis-11/12 p-5">
            <div className="product-title"> {productData?.name} </div>
            <div className="brake-row"></div>
            <div className="product-price">
              ₱ {productData?.price && formatter(productData?.price)}
            </div>
            <div className="product-description">
              {productData?.description}
            </div>
            <div className="product-quantity mt-3">
              <span className="mr-4">Quantity:</span>
              <button onClick={() => set_quantity(quantity + 1)}>
                <FaPlus className="icon mr-3" />
              </button>
              {quantity}
              <button
                onClick={() => quantity > 1 && set_quantity(quantity - 1)}
              >
                <FaMinus className="icon ml-3" />
              </button>
            </div>
            <div className="order-actions mt-3">
              <button
                className="button sm:mr-2 mr-0"
                onClick={() => handleOrder(true)}
              >
                Cart
              </button>
              <button
                className="button ml-2"
                onClick={() => handleOrder(false)}
              >
                Order
              </button>
            </div>
            <div className="flex mt-5">
              <div className="badges">
                <FaCalendarCheck className="inline" /> 100 % Authentic
              </div>
              <div className="badges">
                <FaFaceSmileBeam className="inline" /> Free & Easy Returns
              </div>
              <div className="badges">
                <FaTruck className="inline" /> Guaranteed Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
