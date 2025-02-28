import React from "react";

interface ProductCardProps {
  data: {
    name: string;
    description: string;
    price: number;
    picture: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const formatter = new Intl.NumberFormat("en").format;
  return (
    <div className="items-card cursor-pointer">
      <div className="card card-compact bg-base-100 shadow-sm shadow-blue-200 h-72">
        <figure>
          <img
            className="h-32"
            src={require(`../images/product/${data?.picture}`)}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.name}</h2>
          <p className="card-discription">{data?.description}</p>
          <div className="card-actions justify-end">
            <div className="card-price"> ₱ {formatter(data.price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
