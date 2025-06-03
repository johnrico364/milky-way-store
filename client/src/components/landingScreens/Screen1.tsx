import { useNavigate } from "react-router-dom";

import { IoPersonSharp } from "react-icons/io5";

export const Screen1 = () => {
  const navigate = useNavigate();

  return (
    <div className="screen1-container">
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 z-10">
        <h1 className="headings-text">
          FRESH MILK
          <br className="mb-4" />
          <span className="mt-4 block">HIGH QUALITY</span>
        </h1>
        <p className="description">
          At MilkyWay Delights, we bring farm-fresh, preservative-free milk
          straight from trusted local dairies to your home. Whether you prefer
          full cream, low-fat, or organic, we’ve got the perfect pour for
          you—packed with goodness, quality-checked, and always chilled to
          perfection.
        </p>
        <p
          style={{ letterSpacing: "1px" }}
          className="text-[0.9rem] md:text-[1.25rem] mt-[1rem]"
        >
          – Your Online Milk Haven!
        </p>
      </div>
      <img
        src={require("../../images/assets/landingPage/cloud1.png")}
        alt="Decorative cloud"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-[600px] min-w-[200px] z-0"
      />{" "}
      <img
        src={require("../../images/assets/landingPage/cloud2.png")}
        alt="Decorative cloud"
        className="absolute bottom-0 left-0 w-[40%] max-w-[400px] min-w-[170px] z-0"
      />
      <img
        src={require("../../images/assets/landingPage/milks.png")}
        alt="Milk products"
        className="absolute bottom-0 right-0 w-[45%] max-w-[650px] min-w-[250px] z-10"
      />
      <nav className="flex justify-between items-center py-4 relative z-20">
        <img
          src={require("../../images/assets/Logo_v2.png")}
          width={90}
          alt="Milky Way Store Logo"
        />
        <button onClick={() => navigate("/login")} className="login-btn">
          <span className="pr-1">LOGIN</span>
          <IoPersonSharp className="text-[1.2rem] mb-[0.3rem] inline" />
        </button>
      </nav>
    </div>
  );
};
