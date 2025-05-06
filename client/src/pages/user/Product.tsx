import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetAllProducts } from "../../hooks/product/useGetProducts";
import { ProductCard } from "../../components/ProductCard";

export const Product = () => {
  const navigate = useNavigate();
  const [allProducts, set_allProducts] = useState<any>([]);
  const [bannerIndex, setBannerIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { getAllProducts } = useGetAllProducts();

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevCount) => (prevCount === 3 ? 1 : prevCount + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const productData = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const products = await getAllProducts("all");
      set_allProducts(products);
    },
  });

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      productData.refetch();
      return;
    }

    const filteredProducts = allProducts.filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    set_allProducts(filteredProducts);
  };

  return (
    <div className="product-container">
      <div className="flex justify-center">
        <img
          className="banner"
          src={require(`../../images/assets/milk-banner-${bannerIndex}.png`)}
          alt="banner"
        />
      </div>

      <div className="search-nav font-sans flex justify-end">
        <div className="mt-3">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      
      {allProducts.length === 0 && (
        <div className="text-6xl">No products found...</div>
      )}

      <div className="items-container">
        {allProducts?.map((product: any) => {
          return (
            <div
              key={product._id}
              onClick={() =>
                navigate(`/user/product/${product?.name}-${product?._id}`)
              }
            >
              <ProductCard data={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
