import { OrderDetailsProps } from "./interfaces/orderDetailsProps";

export const CartedProducts: React.FC<OrderDetailsProps> = ({ data }) => {
  const formatter = new Intl.NumberFormat("en").format;
  return (
    <div className="carted-products">
      <div className="card card-side bg-base-100 h-44">
        <div className="sm:basis-4/12 basis-6/12">
          <img
            src={require(`../images/product/${data?.product?.picture}`)}
            alt="Product"
          />
        </div>
        <div className="basis-8/12">
          <div className="card-body">
            <h2 className="card-title">{data?.product?.name}</h2>
            <div className="details">
              <div>Price: ₱ {data?.product?.price}</div>
              <div>Quantity: x{data?.quantity}</div>
              <div className="text-end mt-4">
                Total: ₱ {formatter(data?.payment)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
