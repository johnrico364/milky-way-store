import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store";

export const useSignup = () => {
  const dispatch = useDispatch();
  const [isLoading, set_isLoading] = useState(false);

  const signupUser = async (newUser: any) => {
    set_isLoading(true);
    try {
      const user: any = await axios.post("/api/user/signup", newUser);

      localStorage.setItem("user", JSON.stringify(user.data));
      dispatch(login(user.data));
      return true;
    } catch (error: any) {
      alert(error.response.data.error);
    }
    set_isLoading(false);
  };

  return { signupUser, isLoading };
};
