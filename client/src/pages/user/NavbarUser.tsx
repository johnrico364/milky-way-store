import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowRightFromBracket,
  FaBars,
  FaBox,
  FaCartShopping,
  FaCircleInfo,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaUserLarge,
  FaXmark,
} from "react-icons/fa6";
import { GiMilkCarton } from "react-icons/gi";
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
      icon: <FaBox className="me-1" />,
    },
    {
      path: "cart",
      name: "Cart",
      icon: <FaCartShopping className="me-1" />,
    },
    {
      path: "profile",
      name: "Profile",
      icon: <FaUserLarge className="me-1" />,
    },
  ];

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
                <span
                  className={
                    location.pathname === `/user/${route.path}`
                      ? "underline"
                      : ""
                  }
                >
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
              <li
                key={route.path}
                className="hideOnMobile"
                onClick={() => navigate(route.path)}
              >
                <span
                  className={
                    location.pathname === `/user/${route.path}`
                      ? "underline"
                      : ""
                  }
                >
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
        <div className="footer border">
          <div className="flex flex-wrap justify-center items-center w-full">
            <div className="basis-2/12 mt-3">
            <GiMilkCarton className="text-[10rem]"/>
            </div>
            <div className="basis-2/12">
              <div className="mb-5 font-semibold">Helpful Links</div>
              <div>Cookie Policy</div>
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
              <div>Product Declarations</div>
              <div className="cursor-pointer" onClick={() => navigate('/about')}>About Us</div>
            </div>
            <div className="basis-2/12">
              <div className="mb-5 font-semibold">Follow us on</div>

              <div>
                <FaTwitter className="inline"/> @MilkyWayOnlineShop
              </div>
              <div>
                <FaInstagram className="inline"/> @milky.way.online
              </div>
              <div>
                <FaFacebook className="inline"/> @MilkyWayOfficial
              </div>
            </div>
            <div className="basis-4/12">
              <div className="font-semibold">Email</div>
              <div>milkywayshop@gmail.com</div>
              <div className="mt-2 font-semibold">Address</div>
              <div>Highway Mandaue, Coner L. Jayme St. Mandaue City, Cebu</div>
              <div className="mt-2 font-semibold">Contact Number</div>
              <div>(032) 230 1234</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
