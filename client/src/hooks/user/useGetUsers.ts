import axios from "axios";

export const useGetAllUsers = () => {
  const getAllUsers = async (status: string) => {
    try {
      const users = await axios.get(`/api/user/get/all-accounts/${status}`);
      return users.data.users;
    } catch (error) {}
  };

  return { getAllUsers };
};
