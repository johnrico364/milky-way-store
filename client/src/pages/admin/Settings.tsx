import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const navigate = useNavigate();

  const logoutFn = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-settings-container">
      <div className="lg:basis-7/12 basis-11/12 mt-5">
        <div className="cells mb-5 flex overflow-auto">
          <div className="w-10/12">
            Reset product data
            <div className="note">
              Remove all products and cancel it's orders
            </div>
          </div>
          <button className="button">Clear</button>
        </div>

        <div className="cells mb-5 flex">
          <div className="w-10/12">
            Reset user data
            <div className="note">Remove all users except admins</div>
          </div>
          <button className="button">Clear</button>
        </div>

        <div className="cells mb-5 flex">
          <div className="w-10/12">
            Reset order data
            <div className="note">
              Remove all ongoing orders and carted orders
            </div>
          </div>
          <button className="button">Clear</button>
        </div>

        <div className="cells mb-5 flex">
          <div className="w-10/12"></div>
          <button className="w-40" onClick={logoutFn}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
