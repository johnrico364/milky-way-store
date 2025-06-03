import { useEffect, useState } from "react";
import { useGetAllProducts } from "../../hooks/product/useGetProducts";
import { ProductCard } from "../ProductCard";

export const Screen2 = () => {
  const [allProducts, setAllProducts] = useState<any>([]);

  const { getAllProducts } = useGetAllProducts();

  const getAllProductsData = async () => {
    const products = await getAllProducts("all");
    setAllProducts(products);
  };

  useEffect(() => {
    getAllProductsData();
  }, []);

  return (
    <div className="screen2-container">
      <h2 className="headings text-center text-3xl font-bold mb-8">AVAILABLE PRODUCTS</h2>
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product: any) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};
