export interface OrderDetailsProps {
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
  updatedAt: string;
}