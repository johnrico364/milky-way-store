import axios from "axios";

export const useGetAllUsers = () => {
  const getAllUsers = async (status: string) => {
    try {
      const users = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/get/all-accounts/${status}`
      );
      return users.data.users;
    } catch (error) {}
  };

  return { getAllUsers };
};
