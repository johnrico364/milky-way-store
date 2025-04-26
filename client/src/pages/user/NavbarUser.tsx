import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBox,
  FaCartShopping,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaUserLarge,
} from "react-icons/fa6";
import { GiMilkCarton } from "react-icons/gi";
import axios from "axios";
import { useGetAllCarts } from "../../hooks/order/useGetOrder";

export const NavbarUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAllCarts } = useGetAllCarts();

  const user = JSON.parse(localStorage.getItem("user") || `{"token":"null"}`);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const [cartsCount, set_cartsCount] = useState<number>();

  const checkAuthUser = async () => {
    try {
      const user = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/auth-token`
      );
      user.data.isAdmin && navigate("/admin/dashboard");

      const carts = await getAllCarts(user.data.id);
      set_cartsCount(carts.length);
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
      path: "products",
      name: "Products",
      icon: <FaBox />,
    },
    {
      path: "cart",
      name: "Cart",
      icon: <FaCartShopping />,
    },
    {
      path: "profile",
      name: "Profile",
      icon: <FaUserLarge />,
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
                            `/user/${route.name.toLocaleLowerCase()}`
                              ? "selected-route"
                              : ""
                          }
                          onClick={() => navigate(route.name.toLowerCase())}
                        >
                          {route.icon}
                          {i === 1 && <span className="carted-count bg-[#0a0a5d]">{cartsCount}</span>}
                          <span className="carted-count"></span>
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
                        `/user/${route.name.toLocaleLowerCase()}`
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

        <div className="footer hidden sm:block">
          <div className="flex flex-wrap justify-center items-center w-full">
            <div className="basis-2/12 mt-3 hidden lg:block">
              <GiMilkCarton className="text-[10rem]" />
            </div>
            <div className="basis-2/12">
              <div className="mb-5 font-semibold">Helpful Links</div>
              <div>Cookie Policy</div>
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
              <div>Product Declarations</div>
              <div
                className="cursor-pointer"
                onClick={() => navigate("/about")}
              >
                About Us
              </div>
            </div>
            <div className="basis-2/12">
              <div className="mb-5 font-semibold">Follow us on</div>

              <div>
                <FaTwitter className="inline" /> @MilkyWayOnlineShop
              </div>
              <div>
                <FaInstagram className="inline" /> @milky.way.online
              </div>
              <div>
                <FaFacebook className="inline" /> @MilkyWayOfficial
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
