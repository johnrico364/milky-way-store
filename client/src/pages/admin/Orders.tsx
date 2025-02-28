import { FaBell } from "react-icons/fa6";
import { OrderDetails } from "../../components/OrderDetails";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGetToShipOrders } from "../../hooks/order/useGetToShipOrders";
import { useState } from "react";
import { useUpdateOrderStatus } from "../../hooks/order/useUpdateOrderStatus";

export const Orders = () => {
  const { getToShipOrders } = useGetToShipOrders();
  const { updateOrderStatus } = useUpdateOrderStatus();

  const [ordersData, set_ordersData] = useState([]);

  const effectOrder = async () => {
    const order = await getToShipOrders();
    set_ordersData(order);
  };
  const effectQuery = useQuery({
    queryKey: ["orders"],
    queryFn: effectOrder,
  });

  const approveOrDeclineOrder = async (status: string, order: any) => {
    try {
      const res = window.confirm(
        `Product: ${order.product.name} \n\nPress "ok" to ${status} this product?`
      );

      if (res) {
        set_ordersData(
          ordersData.filter((orderData: any) => orderData !== order)
        );
        await updateOrderStatus(status, order);
      }
    } catch (error) {}
  };

  return (
    <div className="admin-orders-container">
      <div className="lg:basis-7/12 basis-11/12 pt-6">
        {ordersData.map((order: any) => {
          return (
            <div className="data-wrapper">
              <div className="basis-9/12">
                <OrderDetails data={order} />
              </div>

              <div className="basis-3/12 text-center">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
