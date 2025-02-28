import axios from "axios";

export const useEditProducts = (_id: any) => {
  const editProductAPI = async (newData: any) => {
    try {
      const product = await axios.patch(`/api/product/update/${_id}`, newData);
      return true;
    } catch (error) {}
  };

  return { editProductAPI };
};
