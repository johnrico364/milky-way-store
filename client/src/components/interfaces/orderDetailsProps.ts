export interface OrderDetailsProps {
  data: {
    _id: string;
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
  toRecieve: boolean;
}
