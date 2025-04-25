import axios from "axios";

export const useUpdateUser = (_id: any) => {
  const updateUser = async (newData: any) => {
    try {
      const user = await axios.patch(`/api/user/update/${_id}`, newData);
      return true;
    } catch (error: any) {
      console.log(error.response.data.error);
      return false;
    }
  };
  return { updateUser };
};
