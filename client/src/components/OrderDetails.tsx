import { formatDistanceToNow } from "date-fns";
import { OrderDetailsProps } from "./interfaces/orderDetailsProps";
import { useUpdateDeliveryStatus } from "../hooks/order/useUpdateOrder";

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  data,
  toRecieve,
}) => {
  const formatter = new Intl.NumberFormat("en").format;
  const createdDate = formatDistanceToNow(new Date(data?.createdAt), {
    addSuffix: true,
  });

  const { updateDeliveryStatus } = useUpdateDeliveryStatus();

  const recieveOrderFn = async () => {
    window.location.reload();
    await updateDeliveryStatus(data._id);
  };
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
            {toRecieve && (
              <div className="text-end mt-2">
                <button
                  className="recieve-button"
                  onClick={() => recieveOrderFn()}
                >
                  To Receive
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
