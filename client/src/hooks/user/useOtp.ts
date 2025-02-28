import axios from "axios";
import { useState } from "react";

export const useOtp = () => {
  const [isLoading, set_isLoading] = useState(false);

  const getOtp = async (user: any | null) => {
    set_isLoading(true);
    try {
      const otp = await axios.post("api/user/signup/otp", user);
      set_isLoading(false);
      return otp.data;
    } catch (error: any) {
      return { otp: 9237489783278, mess: error.response.data.error };
    }
  };

  return { getOtp, isLoading };
};
