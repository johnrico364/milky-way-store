import { FaEnvelope, FaKey } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/user/useLogin";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect } from "react";

export const Login = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Not an email format")
      .required("Email required."),
    password: yup
      .string()
      .min(8, "Password is too short")
      .required("Provide a password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const user = JSON.parse(localStorage.getItem("user") || `{"token": "null"}`);
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const navigate = useNavigate();
  const { loginUser, isLoading } = useLogin();

  const loginFn = async (form: any) => {
    try {
      const response = await loginUser(form);

      if (response?.response) {
        navigate(
          response.user_status.isAdmin ? "/admin/dashboard" : "/user/product"
        );
      }
    } catch (error) {}
  };

  const checkAuthUser = async () => {
    try {
      const user = await axiosInstance.get("api/user/auth-token");

      if (user.data.mess) {
        navigate(user.data.isAdmin ? "/admin/dashboard" : "/user/product");
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <div className="login-container">
      <div className="flex">
        <div className="bg-side"></div>

        <div className="form-side">
          <div className="basis-9/12">
            <img
              className="img-logo"
              src={require("../images/assets/Logo.png")}
              width={600}
              alt="logo"
            />

            <div className="title-login">Log in</div>
            <form className="sm:m-20" onSubmit={handleSubmit(loginFn)}>
              <div className="w-full">
                <div>
                  <FaEnvelope className="icons" />
                  <input
                    className="login-input"
                    type="text"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <div className="error-m">{errors.email?.message}</div>
                </div>
                <div className="mt-4">
                  <FaKey className="icons" />

                  <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <div className="error-m">{errors.password?.message}</div>
                </div>
                <div className="mt-6 text-end">
                  <button className="btn">Login</button>
                </div>
                <div className="create-acc" onClick={() => navigate("/signup")}>
                  Create Account?
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
