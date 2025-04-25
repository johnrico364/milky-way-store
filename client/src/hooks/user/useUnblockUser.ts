import axios from "axios";

export const useUnblockUser = () => {
  const unblockUser = async (user_id: string) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/unblock/${user_id}`
      );
    } catch (error) {}
  };
  return { unblockUser };
};
