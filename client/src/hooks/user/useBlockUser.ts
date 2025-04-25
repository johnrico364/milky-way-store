import axios from "axios";

export const useBlockUser = () => {
  const blockUser = async (user_id: string) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/block/${user_id}`
      );
      return {};
    } catch (error) {}
  };
  return { blockUser };
};
