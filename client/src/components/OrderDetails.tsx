import React from "react";
import { formatDistanceToNow } from "date-fns";

interface OrderDetailsProps {
  data: {
    quantity: number;
    payment: number;
    createdAt: string;
    product: {
      name: string;
      description: string;
      price: number;
      picture: string;
    };
  };
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ data }) => {
  const formatter = new Intl.NumberFormat("en").format;
  const createdDate = formatDistanceToNow(new Date(data?.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="order-card">
      <div className="card card-side bg-base-100 h-44">
        <div className="sm:basis-3/12 basis-6/12">
          <img
            src={require(`../images/product/${data?.product?.picture}`)}
            alt="product"
            className="h-44"
          />
        </div>
        <div className="basis-8/12">
          <div className="card-body gap-1 py-0 px-3">
            <div className="card-title">{data?.product?.name}</div>
            <div className="details ">{data?.product?.description}</div>
            <div className="text-end mt-2">
              ₱{data?.product?.price} x {data?.quantity}
            </div>
            <div className="price">Total: ₱ {formatter(data?.payment)}</div>
            <div className="details text-end">Ordered {createdDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
