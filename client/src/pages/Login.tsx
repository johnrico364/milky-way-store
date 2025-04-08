import { FaEnvelope, FaKey } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/user/useLogin";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";

export const Login = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Not an email format")
      .required("Email required."),
    password: yup
      .string()
      .required("Password required")
      .min(8, "Password is too short"),
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
  const { loginUser } = useLogin();

  const [loginError, set_loginError] = useState("");

  const loginFn = async (form: any) => {
    const response = await loginUser(form);

    switch (response?.status) {
      case 200:
        navigate(
          response?.user_status?.isAdmin ? "/admin/dashboard" : "/user/products"
        );
        break;
      case 400:
        set_loginError(response?.error);

        const modal = document.getElementById(
          "error_modal"
        ) as HTMLDialogElement | null;

        if (modal) modal.showModal();
    }
  };

  const checkAuthUser = async () => {
    try {
      const user = await axiosInstance.get("api/user/auth-token");

      if (user.data.mess) {
        navigate(user.data.isAdmin ? "/admin/dashboard" : "/user/products");
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
                  <button className="button">Login</button>
                </div>
                <div className="create-acc" onClick={() => navigate("/signup")}>
                  Create Account?
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <dialog id="error_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Login Error!</h3>
          <p className="py-4">{loginError}</p>
        </div>
      </dialog>
    </div>
  );
};
