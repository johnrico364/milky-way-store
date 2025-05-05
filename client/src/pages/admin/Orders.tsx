import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { OrderDetailsProps } from "./interfaces/orderDetailsProps";
// Hooks
import {
  useUpdateDeliveryStatus,
  useUpdateOrderStatus,
} from "../../hooks/order/useUpdateOrder";
import { useGetAllOrdersByStatus } from "../../hooks/order/useGetOrder";

export const Orders = () => {
  const { getAllOrdersByStatus } = useGetAllOrdersByStatus();
  const { updateOrderStatus } = useUpdateOrderStatus();
  const { updateDeliveryStatus } = useUpdateDeliveryStatus();

  const [queryOrderStatus, set_queryOrderStatus] = useState("pending");
  const [ordersData, set_ordersData] = useState([]);

  const effectOrder = async () => {
    const order = await getAllOrdersByStatus(queryOrderStatus);
    set_ordersData(order);
  };

  useEffect(() => {
    effectOrder();
  }, [queryOrderStatus]);

  const approveOrDeclineOrderFn = async (status: string, order: any) => {
    try {
      set_ordersData(
        ordersData.filter((orderData: any) => orderData !== order)
      );
      await updateOrderStatus(status, order);
    } catch (error) {}
  };

  return (
    <div className="admin-orders-container">
      <div className="flex justify-end pe-5">
        <select
          className="dropdown mt-1"
          onChange={(e) => set_queryOrderStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="delivery">Delivery</option>
          <option value="history">History</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Ordered By</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Ordered</th>
              {queryOrderStatus === "pending" && <th>Actions</th>}
              {queryOrderStatus === "history" && <th>Arrived</th>}
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order: OrderDetailsProps, i) => {
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
                  <td>
                    {order.ordered_by.fname} {order.ordered_by.lname}
                  </td>
                  <td>{order.product.name}</td>
                  <td>{order.product.price}</td>
                  <td>{order.quantity}</td>
                  <td>{formatter(order.payment)}</td>
                  <td>{createdDate}</td>
                  {queryOrderStatus === "pending" && (
                    <td>
                      <button
                        className="button"
                        onClick={() =>
                          approveOrDeclineOrderFn("approve", order)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="button"
                        onClick={() =>
                          approveOrDeclineOrderFn("decline", order)
                        }
                      >
                        Decline
                      </button>
                    </td>
                  )}
                  {queryOrderStatus === "history" && <td>{arriveDate}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
        {ordersData.length === 0 && (
          <div className="text-center text-2xl font-bold">
            No orders found...
          </div>
        )}
      </div>
    </div>
  );
};
