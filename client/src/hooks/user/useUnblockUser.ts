import axios from "axios";

export const useUnblockUser = () => {
  const unblockUser = async (user_id: string) => {
    try {
      await axios.get(`/api/user/unblock/${user_id}`);
    } catch (error) {}
  };
  return { unblockUser };
};
