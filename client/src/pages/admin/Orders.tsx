import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

// Hooks
import { useUpdateOrderStatus } from "../../hooks/order/useUpdateOrderStatus";
import { useGetPendingOrDeliveryOrders } from "../../hooks/order/useGetOrder";

interface OrderDetailsProps {
  quantity: number;
  payment: number;
  ordered_by: {
    fname: string;
    lname: string;
  };
  product: {
    name: string;
    price: number;
  };
  createdAt: string;
}

export const Orders = () => {
  const { getPendingOrDeliveryOrders } = useGetPendingOrDeliveryOrders();
  const { updateOrderStatus } = useUpdateOrderStatus();
  const [queryOrderStatus, set_queryOrderStatus] = useState("pending");

  const [ordersData, set_ordersData] = useState([]);

  const effectOrder = async () => {
    const order = await getPendingOrDeliveryOrders(queryOrderStatus);
    set_ordersData(order);
    console.log(order);
  };

  useEffect(() => {
    effectOrder();
  }, [queryOrderStatus]);

  const approveOrDeclineOrder = async (status: string, order: any) => {
    try {
      set_ordersData(
        ordersData.filter((orderData: any) => orderData !== order)
      );
      await updateOrderStatus(status, order);
    } catch (error) {}
  };

  return (
    <div className="admin-orders-container">
      <div className="overflow-x-auto">
        <div className="flex justify-end pe-5">
          <select
            className="dropdown mt-1"
            onChange={(e) => set_queryOrderStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Ordered By</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Ordered</th>
              <th>Actions</th>
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
                  <td>
                    <button
                      className="button"
                      onClick={() => approveOrDeclineOrder("approve", order)}
                    >
                      Approve
                    </button>
                    <button
                      className="button"
                      onClick={() => approveOrDeclineOrder("decline", order)}
                    >
                      Decline
                    </button>
                  </td>
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
