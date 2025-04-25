import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ProductDetails } from "./interfaces/productDetailsProps";
// Custom Hooks
import { useGetOneProduct } from "../../hooks/product/useGetProducts";
import { useEditProducts } from "../../hooks/product/useEditProduct";

export const ProductEdit = () => {
  const { details } = useParams();
  const navigate = useNavigate();
  const _id = details?.split("-")[1];

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Product name required")
      .min(3, "Name too short"),
    description: yup.string().required("Provide product description"),
    supplier: yup.string().required("Supplier required"),
    price: yup
      .number()
      .transform((value, origvalue) =>
        typeof origvalue === "string" && origvalue.trim() === "" ? 1 : value
      )
      .integer("Whole number only")
      .min(5, "Price too low"),
    stocks: yup
      .number()
      .transform((value, origvalue) =>
        typeof origvalue === "string" && origvalue.trim() === "" ? 1 : value
      )
      .integer("Whole number only")
      .min(10, "Stocks too low"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { getOneProduct } = useGetOneProduct();
  const { editProductAPI } = useEditProducts(_id);

  const [productData, set_productData] = useState<ProductDetails>();
  const [productImg, set_productImg] = useState<File | null>(null);
  const [previewProductImg, set_previewProductImg] = useState<
    String | undefined
  >("");

  const saveProductFn = async (form: any) => {
    const productForm = new FormData();

    productImg && productForm.append("image", productImg);
    productForm.append("product", JSON.stringify(form));
    productForm.append("oldPic", JSON.stringify(productData?.picture));

    const response = await editProductAPI(productForm);
    response && navigate("/admin/products");
  };

  const imageChangeFn = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      set_previewProductImg(previewUrl);
    } else {
      set_previewProductImg(productData?.picture);
    }
    set_productImg(e.target.files ? e.target.files[0] : null);
  };

  const getProductData = async () => {
    const data = await getOneProduct(_id);

    set_productData(data);
    set_previewProductImg(data.picture);
    reset({
      name: data.name,
      description: data.description,
      supplier: data.supplier,
      price: data.price,
      stocks: data.stocks,
    });
  };
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="product-edit-container">
      <div className="basis-10/12">
        <div className="flex flex-wrap">
          <div className="md:basis-4/12 basis-full">
            <div className="p-img">
              <img
                src={
                  previewProductImg
                    ? previewProductImg.startsWith("blob:")
                      ? previewProductImg
                      : require(`../../images/product/${previewProductImg}`)
                    : ""
                }
                alt="product"
              />
            </div>
          </div>

          <div className="md:basis-8/12 basis-full md:px-10 max-md:mt-5">
            <div className="edit-form">
              <form onSubmit={handleSubmit(saveProductFn)}>
                <div className="flex flex-wrap gap-3">
                  <div className="basis-full">
                    <div>Edit image</div>
                    <input
                      className="img-input"
                      type="file"
                      accept="image/*"
                      onChange={imageChangeFn}
                    />
                  </div>
                  <div className="basis-full">
                    <div>Name:</div>
                    <input
                      className="prod-input"
                      type="text"
                      defaultValue={productData?.name}
                      {...register("name")}
                    />
                    <div className="errors">{errors.name?.message}</div>
                  </div>
                  <div className="basis-full">
                    <div>Description:</div>
                    <textarea
                      className="prod-input min-h-28"
                      defaultValue={productData?.description}
                      {...register("description")}
                    ></textarea>
                    <div className="errors">{errors.description?.message}</div>
                  </div>
                  <div className="basis-full">
                    <div>Supplier:</div>
                    <input
                      className="prod-input"
                      type="text"
                      placeholder="Supplier:"
                      defaultValue={productData?.supplier}
                      {...register("supplier")}
                    />
                    <div className="errors">{errors.supplier?.message}</div>
                  </div>
                  <div className="basis-full">
                    <div>Price</div>
                    <input
                      className="prod-input"
                      type="number"
                      placeholder="Price:"
                      defaultValue={productData?.price}
                      {...register("price")}
                    />
                    <div className="errors">{errors.price?.message}</div>
                  </div>
                  <div className="basis-full">
                    <div>Stocks</div>
                    <input
                      className="prod-input"
                      type="number"
                      placeholder="Stocks:"
                      defaultValue={productData?.stocks}
                      {...register("stocks")}
                    />
                    <div className="errors">{errors.stocks?.message}</div>
                  </div>
                  <div className="basis-full">
                    <button
                      type="reset"
                      className="button cancel-btn"
                      onClick={() => navigate("/admin/products")}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button save-btn">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
