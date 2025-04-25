import axios from "axios";

export const useLogin = () => {
  const loginUser = async (form: any) => {
    try {
      const user_data = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/login`,
        form
      );
      const user_token = user_data.data.token;
      localStorage.setItem("user", JSON.stringify({ token: user_token }));

      return { status: 200, user_status: user_data.data };
    } catch (error: any) {
      return { status: 400, error: error.response.data.error };
    }
  };

  return { loginUser };
};
