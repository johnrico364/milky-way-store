import {
  FaArrowRightFromBracket,
  FaMapLocation,
  FaUserGear,
} from "react-icons/fa6";
import { OrderDetails } from "../../components/OrderDetails";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParseToken } from "../../hooks/user/useParseToken";
import { useGetUserOrderByStatus } from "../../hooks/order/useGetUserOrderByStatus";

interface UserData {
  _id: string;
  address: string;
  fname: string;
  lname: string;
  picture: string;
}

export const Profile = () => {
  const navigate = useNavigate();

  const { parseToken } = useParseToken();
  const { getUserOrder } = useGetUserOrderByStatus();

  const [userData, set_userData] = useState<UserData>();
  const [ordersData, set_ordersData] = useState<string[]>([]);
  const [queryOrderStatus, set_queryOrderStatus] =
    useState<string>("to-approve");

  const effectProf = async () => {
    try {
      const user = await parseToken();
      set_userData(user);

      const orders = await getUserOrder(user?._id, queryOrderStatus);
      set_ordersData(orders);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    effectProf();
  }, [queryOrderStatus]);

  const logoutFn = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="flex">
        <div className="details-side">
          <div className="w-1/3">
            <FaUserGear className="ms-auto text-3xl" />
          </div>
          <div className="p-img">
            <img
              src={
                userData?.picture
                  ? require(`../../images/user/${userData?.picture}`)
                  : ""
              }
              alt="Profile"
            />
          </div>

          <div className="name">
            {userData?.fname} {userData?.lname}
          </div>
          <div className="address">
            <FaMapLocation className="inline" /> {userData?.address}
          </div>
          <div onClick={logoutFn} className="logout">
            <FaArrowRightFromBracket className="inline me-1" />
            Log Out
          </div>
          <div className="xl:mb-60 mb-0"></div>
        </div>

        <div className="data-side">
          <div className="xl:w-10/12 lg:px-0 w-full px-2  mx-auto">
            <select
              className="border-2 rounded-md"
              onChange={(e) => set_queryOrderStatus(e.target.value)}
            >
              <option value={"to-approve"}>To Approve</option>
              <option value={"to-ship"}>To Ship</option>
              <option value={"history"}>Purchase History</option>
            </select>

            <div className="card-container flex">
              <div className="basis-full">
                {ordersData?.map((order: any) => {
                  return (
                    <div>
                      <OrderDetails data={order} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
