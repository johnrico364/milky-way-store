export interface OrderDetailsProps {
  data: {
    quantity: number;
    payment: number;
    product: {
      name: string;
      description: string;
      price: number;
      picture: string;
    };
    createdAt: string;
  };
}