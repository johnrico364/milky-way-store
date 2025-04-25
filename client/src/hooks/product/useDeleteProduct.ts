import axios from "axios";

export const useDeleteProduct = () => {
  const deleteProductAPI = async (_id: any) => {
    try {
      const deletedProduct = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/product/delete/${_id}`
      );
    } catch (error) {}
  };

  return { deleteProductAPI };
};
