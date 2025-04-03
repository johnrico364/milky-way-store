import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBox,
  FaChartLine,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa6";
import axios from "axios";

export const NavbarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const routes = [
    {
      name: "Dashboard",
      icon: <FaChartLine />,
    },
    {
      name: "Orders",
      icon: <FaClipboardList />,
    },
    {
      name: "Products",
      icon: <FaBox />,
    },
    {
      name: "Users",
      icon: <FaUsers />,
    },
  ];

  return (
    <div>
      <div className="my-navbar">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar w-full">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <FaBars className=" text-[1.7rem]" />
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">
                <span>
                  <img
                    src={require("../../images/assets/Logo.png")}
                    alt="Logo"
                    width={150}
                  />
                </span>
              </div>
              <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal">
                  {/* Navbar menu content here */}
                  {routes.map((route, i) => {
                    return (
                      <li key={i}>
                        <span
                          className={
                            location.pathname ===
                            `/admin/${route.name.toLocaleLowerCase()}`
                              ? "selected-route"
                              : ""
                          }
                          onClick={() => navigate(route.name.toLowerCase())}
                        >
                          {route.icon}
                          {route.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              {routes.map((route, i) => {
                return (
                  <li key={i}>
                    <span
                      className={
                        location.pathname ===
                        `/admin/${route.name.toLocaleLowerCase()}`
                          ? "selected-route"
                          : ""
                      }
                      onClick={() => navigate(route.name.toLowerCase())}
                    >
                      {route.icon}
                      {route.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
