export interface ProductDetailsProps {
  data: {
    name: string;
    description: string;
    price: number;
    stocks: number;
    supplier: string;
    picture: string;
    isDeleted: boolean;
    createdAt: any;
    updatedAt: any;
  };
}