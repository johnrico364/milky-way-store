import axios from "axios";

export const useGetAllUsers = () => {
  const getAllUsers = async () => {
    try {
      const users = await axios.get("/api/user/get/all-accounts");
      return users.data.users
    } catch (error) {}
  };

  return { getAllUsers };
};
