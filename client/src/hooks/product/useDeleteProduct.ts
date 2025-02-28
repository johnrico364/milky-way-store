import axios from "axios";

export const useDeleteProduct = () => {
  const deleteProductAPI = async (_id: any) => {
    try {
      const deletedProduct = await axios.patch(`/api/product/delete/${_id}`);
    } catch (error) {}
  };

  return { deleteProductAPI };
};
