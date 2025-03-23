import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

// Hooks
import { useUpdateOrderStatus } from "../../hooks/order/useUpdateOrderStatus";
import { useGetToShipOrders } from "../../hooks/order/useGetOrder";

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
  const { getToShipOrders } = useGetToShipOrders();
  const { updateOrderStatus } = useUpdateOrderStatus();

  const [ordersData, set_ordersData] = useState([]);

  const effectOrder = async () => {
    const order = await getToShipOrders();
    set_ordersData(order);
  };

  useQuery({
    queryKey: ["orders"],
    queryFn: effectOrder,
  });

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
      </div>
    </div>
  );
};
