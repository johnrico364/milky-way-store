import axios from "axios";
import { useState } from "react";

export const useOtp = () => {
  const [isLoading, set_isLoading] = useState(false);

  const getOtp = async (user: any | null) => {
    set_isLoading(true);
    try {
      const otp = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/signup/otp`,
        user
      );
      set_isLoading(false);
      return { status: 200, otp: otp.data.otp, mess: otp.data.mess };
    } catch (error: any) {
      set_isLoading(false);
      return {
        status: 400,
        otp: 9237489783278,
        error: error.response.data.error,
      };
    }
  };

  return { getOtp, isLoading };
};
