import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaArrowRightFromBracket,
  FaBars,
  FaBox,
  FaCartShopping,
  FaChartLine,
  FaCircleInfo,
  FaClipboardList,
  FaGears,
  FaUserLarge,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";
import axios from "axios";

export const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [sidebar, set_sidebar] = useState("none");

  const user = JSON.parse(localStorage.getItem("user") || `{"token":"null"}`);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const checkAuthAdmin = async () => {
    try {
      const user = await axiosInstance.get("/api/user/auth-token");

      user.data.isAdmin || navigate("/user/product");
    } catch (error: any) {
      error.response.data.mess || navigate("/login");
      console.log(error.response.data.mess);
    }
  };

  useEffect(() => {
    checkAuthAdmin();
  });

  return (
    <div>
      <div className="my-navbar">
        <nav>
          <ul
            className="sidebar"
            onClick={() => set_sidebar("none")}
            style={{ display: sidebar }}
          >
            <li>
              <span>
                <FaXmark className="icons" />
              </span>
            </li>
            <li onClick={() => navigate("dashboard")}>
              <span>
                <FaChartLine className="me-1" />
                Dashboard
              </span>
            </li>
            <li onClick={() => navigate("orders")}>
              <span>
                <FaClipboardList className="me-1" />
                Orders
              </span>
            </li>
            <li onClick={() => navigate("products")}>
              <span>
                <FaBox className="me-1" />
                Products
              </span>
            </li>
            <li onClick={() => navigate("users")}>
              <span>
                <FaUsers className="me-1" />
                Users
              </span>
            </li>
            <li onClick={() => navigate("settings")}>
              <span>
                <FaGears className="me-1" />
                Settings
              </span>
            </li>
            <li>
              <span>
                <FaArrowRightFromBracket className="me-1" />
                Logout
              </span>
            </li>
          </ul>

          <ul>
            <li className="xl:ms-8 ms-2">
              <span>
                <img
                  src={require("../../images/assets/Logo.png")}
                  alt="Logo"
                  width={170}
                />
              </span>
            </li>
            <li className="hideOnMobile" onClick={() => navigate("dashboard")}>
              <span>
                <FaChartLine className="me-1" />
                Dashboard
              </span>
            </li>
            <li className="hideOnMobile" onClick={() => navigate("orders")}>
              <span>
                <FaClipboardList className="me-1" />
                Orders
              </span>
            </li>
            <li className="hideOnMobile" onClick={() => navigate("products")}>
              <span>
                <FaBox className="me-1" />
                Products
              </span>
            </li>
            <li className="hideOnMobile" onClick={() => navigate("users")}>
              <span>
                <FaUsers className="me-1" />
                Users
              </span>
            </li>
            <li
              className="hideOnMobile xl:me-8 me-2"
              onClick={() => navigate("settings")}
            >
              <span>
                <FaGears className="me-1" />
                Settings
              </span>
            </li>
            <li className="menu-button" onClick={() => set_sidebar("flex")}>
              <span>
                <FaBars className="icons" />
              </span>
            </li>
          </ul>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
