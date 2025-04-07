import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import { FaBoxOpen, FaCirclePlus } from "react-icons/fa6";

// Custom Hooks
import { useDeleteProduct } from "../../hooks/product/useDeleteProduct";
import { useGetAllProducts } from "../../hooks/product/useGetProducts";
import { useAddProduct } from "../../hooks/product/useAddProduct";

import { ProductDetails } from "./interfaces/productDetailsProps";

export const Products = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Product name required")
      .min(3, "Name too short"),
    description: yup.string().required("Provide product description"),
    supplier: yup.string().required("Supplier required"),
    price: yup
      .number()
      .transform((value, origvalue) => (origvalue.trim() === "" ? 1 : value))
      .integer("Whole number only")
      .min(5, "Price too low"),
    stocks: yup
      .number()
      .transform((value, origvalue) => (origvalue.trim() === "" ? 1 : value))
      .integer("Whole number only")
      .min(10, "Stocks too low"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [productImg, set_productImg] = useState<File | null>(null);
  const [successMess, set_successMess] = useState<string>("");
  const [allProducts, set_allProducts] = useState([]);

  const { addProduct, exception, set_exception } = useAddProduct();
  const { getAllProducts } = useGetAllProducts();
  const { deleteProductAPI } = useDeleteProduct();

  const addProductFn = async (form: any) => {
    const productData = new FormData();

    productImg && productData.append("image", productImg);
    productData.append("product", JSON.stringify(form));

    try {
      const prod = await addProduct(productData);

      if (prod?.response) {
        set_successMess(prod?.message);
      }
    } catch (error) {}
  };

  const deleteProductFn = async (_id: any) => {
    await deleteProductAPI(_id);
    productData.refetch();
  };

  const effectProduct = async () => {
    const products = await getAllProducts();
    set_allProducts(products);
  };

  const productData = useQuery({
    queryKey: ["product"],
    queryFn: () => {
      effectProduct();
      return true;
    },
  });

  return (
    <div className="admin-product-container">
      {productData.isLoading && <div className="text-6xl">Loading...</div>}

      {allProducts.length === 0 && (
        <div className="text-3xl font-semibold text-center font-mono">
          No products found...
        </div>
      )}

      <div className="px-5 pt-3">
        <div className="flex justify-end my-3">
          <label htmlFor="add_modal" className="add-product">
            Add Product
          </label>
        </div>
      </div>

      <div className="flex justify-end pe-5 mt-3">
        <select className="dropdown">
          <option value="all">All</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stocks</th>
              <th>Supplier</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product: ProductDetails, i) => {
              const createdDate = formatDistanceToNow(
                new Date(product.createdAt),
                {
                  addSuffix: true,
                }
              );

              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <img
                      src={require(`../../images/product/${product.picture}`)}
                      alt="product"
                      width={70}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stocks}</td>
                  <td>{product.supplier}</td>
                  <td>{createdDate}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() =>
                        navigate(`edit/${product.name}-${product._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="button"
                      onClick={() => {
                        const modal = document.getElementById(
                          `delete_modal_${i}`
                        ) as HTMLDialogElement | null;
                        if (modal) {
                          modal.showModal();
                        }
                      }}
                    >
                      Delete
                    </button>

                    <dialog id={`delete_modal_${i}`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">
                          Delete Confirmation!
                        </h3>
                        <p className="py-4">
                          <b>Name: {product.name}</b>
                          <br />
                          Press "Confirm" to delete this product. Once deleted
                          you cannot restore it back.
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="flex">
                              <button className="button mr-1">Cancel</button>
                              <button
                                className="button"
                                onClick={() => deleteProductFn(product?._id)}
                              >
                                Confirm
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <input type="checkbox" id="add_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit(addProductFn)}>
            <div className="text-2xl font-semibold mb-1">
              <FaBoxOpen className="inline" /> Add Product
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="basis-11/12 mb-2">
                <input
                  className="img-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    set_productImg(e.target.files ? e.target.files[0] : null);
                    set_exception("");
                  }}
                />
                <div className="form-error">{exception}</div>
              </div>
              <div className="basis-11/12 mb-2">
                <input
                  className="prod-input"
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                />
                <div className="form-error">{errors.name?.message}</div>
              </div>
              <div className="basis-11/12 mb-2">
                <textarea
                  className="w-full prod-input pt-2 min-h-20"
                  placeholder="Description"
                  {...register("description")}
                ></textarea>
                <div className="form-error">{errors.description?.message}</div>
              </div>
              <div className="basis-11/12 mb-2">
                <input
                  className="prod-input"
                  type="text"
                  placeholder="Supplier"
                  {...register("supplier")}
                />
                <div className="form-error">{errors.supplier?.message}</div>
              </div>
              <div className="basis-6/12 md:me-1 mb-2">
                <label>Price</label>
                <input
                  className="prod-input"
                  type="number"
                  placeholder="Price"
                  defaultValue={0}
                  {...register("price")}
                />
                <div className="form-error">{errors.price?.message}</div>
              </div>
              <div className="basis-5/12 mb-2">
                <label>Stocks</label>
                <input
                  className="prod-input"
                  type="number"
                  placeholder="Stocks"
                  defaultValue={0}
                  {...register("stocks")}
                />
                <div className="form-error">{errors.stocks?.message}</div>
              </div>
              <div className="basis-11/12 mb-2">
                <button className="form-button">Add Product</button>
              </div>
              <div className="basis-11/12 mb-2 text-lg font-sans">
                {successMess}
              </div>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="add_modal">
          Close
        </label>
      </div>

      {/* <div className="product-data-container">
        {allProducts.map((product: any) => {
          return (
            <div className="data-wrapper">
              <div className="md:basis-10/12 basis-full">
                <ProductDetails data={product} />
              </div>
              <div className="md:basis-2/12 basis-full">
                <div className="flex flex-wrap">
                  <button
                    className="button"
                    onClick={() =>
                      navigate(`edit/${product.name}-${product._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="button"
                    onClick={() => deleteProductFn(product?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};
