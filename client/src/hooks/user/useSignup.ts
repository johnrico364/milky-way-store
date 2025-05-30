import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store";

export const useSignup = () => {
  const dispatch = useDispatch();

  const signupUser = async (newUser: any) => {
    try {
      const user: any = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/signup`,
        newUser
      );

      localStorage.setItem("user", JSON.stringify(user.data));
      dispatch(login(user.data));
      return { status: 200 };
    } catch (error: any) {
      return { status: 400, error: error.response.data.error };
    }
  };

  return { signupUser };
};
