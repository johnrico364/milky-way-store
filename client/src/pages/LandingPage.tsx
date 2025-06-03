import { useEffect } from "react";
import { Screen1 } from "../components/landingScreens/Screen1";
import { Screen2 } from "../components/landingScreens/Screen2";
import { Screen3 } from "../components/landingScreens/Screen3";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LandingPage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || `{"token": "null"}`);
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const checkAuthUser = async () => {
    try {
      const user = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/auth-token`
      );

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
    <div>
      <Screen1 />
      <Screen2 />
      <Screen3 />
    </div>
  );
};
