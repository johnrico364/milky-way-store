import axios from "axios";
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, set_isLoading] = useState(false);

  const loginUser = async (form: any) => {
    set_isLoading(true);
    try {
      const user_data = await axios.post("/api/user/login", form);
      const user_token = user_data.data.token;
      localStorage.setItem("user", JSON.stringify({ token: user_token }));

      return { user_status: user_data.data, response: true };
    } catch (error: any) {
      alert(error.response.data.error);
    }
    set_isLoading(false);
  };

  return { loginUser, isLoading };
};
