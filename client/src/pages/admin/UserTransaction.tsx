import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { OrderDetailsProps } from "./interfaces/orderDetailsProps";
import { useGetUserOrdersTransaction } from "../../hooks/order/useGetOrder";

export const UserTransaction = () => {
  const { id: user_id } = useParams();

  const { getUserOrdersTransaction } = useGetUserOrdersTransaction();
  const [orders, set_orders] = useState([]);

  const ordersEffect = async () => {
    if (!user_id) return;
    const response = await getUserOrdersTransaction(user_id);
    set_orders(response);
  };

  useEffect(() => {
    ordersEffect();
  }, []);

  return (
    <div className="px-5 pt-5">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Ordered</th>
              <th>Arrived</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: OrderDetailsProps, i) => {
              const createdDate = formatDistanceToNow(
                new Date(order.createdAt),
                {
                  addSuffix: true,
                }
              );
              const arriveDate = formatDistanceToNow(
                new Date(order.updatedAt),
                { addSuffix: true }
              );
              const formatter = new Intl.NumberFormat("en").format;
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{order.product.name}</td>
                  <td>{order.product.price}</td>
                  <td>{order.quantity}</td>
                  <td>{formatter(order.payment)}</td>
                  <td>{createdDate}</td>
                  <td>{arriveDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
