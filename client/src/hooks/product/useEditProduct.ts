import axios from "axios";

export const useEditProducts = (_id: any) => {
  const editProductAPI = async (newData: any) => {
    try {
      const product = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/product/update/${_id}`,
        newData
      );
      return true;
    } catch (error) {}
  };

  return { editProductAPI };
};
