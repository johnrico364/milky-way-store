import {
  FaEnvelope,
  FaFileImage,
  FaIdCard,
  FaImage,
  FaKey,
  FaLocationDot,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useOtp } from "../hooks/user/useOtp";
import { useSignup } from "../hooks/user/useSignup";

export const Signup = () => {
  const schema = yup.object().shape({
    fname: yup.string().required("First name required"),
    lname: yup.string().required("Last name required"),
    address: yup.string().required("Provide your address"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email required"),
    password: yup
      .string()
      .min(8, "Password too short")
      .required("Password required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { getOtp, isLoading: otpLoading } = useOtp();
  const { signupUser, isLoading: signupLoading } = useSignup();

  const [noOtp, set_noOtp] = useState(true);
  const [_iOtp, set_iOtp] = useState(7898756752323);

  const [fname, set_fname] = useState<string>("");
  const [email, set_email] = useState<string>("");
  const [otp, set_otp] = useState<number>(0);
  const [imgFile, set_imgFile] = useState<File | null>(null);

  const signupFn = async (form: any) => {
    const userData = new FormData();

    if (otp !== _iOtp) {
      alert("OTP don't match");
      return;
    }
    if (imgFile) {
      userData.append("image", imgFile);
    }
    userData.append("user", JSON.stringify(form));

    try {
      const response = await signupUser(userData);

      response && navigate("/user/product");
    } catch (error) {}
  };

  const sendOtp = async () => {
    if (email === "" || fname === "") {
      alert(" Please provide all the details ! ");
      return;
    }

    const { otp, mess } = await getOtp({ fname, email });
    set_noOtp(otpLoading);
    set_iOtp(otp);
    alert(mess);
  };

  return (
    <div className="signup-container">
      <div className="flex">
        <div className="form-side">
          <div className="basis-9/12">
            <div className="signup-title">| Sign Up</div>

            <form onSubmit={handleSubmit(signupFn)}>
              <div className="w-full">
                <div className="mt-3">
                  <FaImage className="icons" />
                  <label htmlFor="file">
                    Choose profile
                    <FaFileImage className="inline text-white h-5 ms-2" />
                  </label>
                  <input
                    className="hidden"
                    name="profile"
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={(e) =>
                      set_imgFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </div>
                <div className="mt-3">
                  <FaIdCard className="icons" />
                  <input
                    className="signup-input"
                    type="text"
                    placeholder="First Name"
                    {...register("fname")}
                    onChange={(e) => set_fname(e.target.value)}
                  />
                  <div className="error-m">{errors.fname?.message}</div>
                </div>
                <div className="mt-3">
                  <FaIdCard className="icons" />
                  <input
                    className="signup-input"
                    type="text"
                    placeholder="Last Name"
                    {...register("lname")}
                  />
                  <div className="error-m">{errors.lname?.message}</div>
                </div>
                <div className="mt-3">
                  <FaLocationDot className="icons" />
                  <input
                    className="signup-input"
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                  />
                  <div className="error-m">{errors.address?.message}</div>
                </div>
                <div className="mt-3">
                  <FaEnvelope className="icons" />
                  <input
                    className="signup-input"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    onChange={(e) => set_email(e.target.value)}
                  />
                  <div className="error-m">{errors.email?.message}</div>
                </div>
                <div className="mt-3">
                  <FaKey className="icons" />
                  <input
                    className="signup-input otp-input"
                    type="text"
                    placeholder="OTP"
                    onChange={(e) => set_otp(parseInt(e.target.value))}
                  />
                  <span className="otp-btn" onClick={sendOtp}>
                    Send OTP
                  </span>
                  {otpLoading && <div className="loading-m">OTP sending</div>}
                </div>
                <div className="mt-3">
                  <FaKey className="icons" />
                  <input
                    className="signup-input"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <div className="error-m">{errors.password?.message}</div>
                </div>
                <div className="mt-3 text-end">
                  <button className="btn" disabled={noOtp || otpLoading}>
                    Sign Up
                  </button>
                </div>
                <div className="to-login" onClick={() => navigate("/login")}>
                  I have an account
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-side"></div>
      </div>
    </div>
  );
};
