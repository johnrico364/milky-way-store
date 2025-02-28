import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowRightFromBracket,
  FaBars,
  FaBox,
  FaCartShopping,
  FaCircleInfo,
  FaUserLarge,
  FaXmark,
} from "react-icons/fa6";
import axios from "axios";

export const NavbarUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebar, set_sidebar] = useState("none");

  const user = JSON.parse(localStorage.getItem("user") || `{"token":"null"}`);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const checkAuthUser = async () => {
    try {
      const user = await axiosInstance.get("/api/user/auth-token");

      console.log(user.data.isAdmin);
      user.data.isAdmin && navigate("/admin/dashboard");
    } catch (error: any) {
      error.response.data.mess || navigate("/login");
      console.log(error.response.data.mess);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  const routes = [
    {
      path: "product",
      name: "Products",
      icon: <FaBox className="me-1" />
    },
    {
      path: "cart", 
      name: "Cart",
      icon: <FaCartShopping className="me-1" />
    },
    {
      path: "about",
      name: "About",
      icon: <FaCircleInfo className="me-1" />
    },
    {
      path: "profile",
      name: "Profile", 
      icon: <FaUserLarge className="me-1" />
    }
  ]

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
            {routes.map((route) => (
              <li key={route.path} onClick={() => navigate(route.path)}>
                <span className={location.pathname === `/user/${route.path}` ? 'underline' : ''}>
                  {route.icon}
                  {route.name}
                </span>
              </li>
            ))}
            <li
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
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
            {routes.map((route) => (
              <li key={route.path} className="hideOnMobile" onClick={() => navigate(route.path)}>
                <span className={location.pathname === `/user/${route.path}` ? 'underline' : ''}>
                  {route.icon}
                  {route.name}
                </span>
              </li>
            ))}
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
