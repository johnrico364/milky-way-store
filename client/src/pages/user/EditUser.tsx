import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useParseToken } from "../../hooks/user/useParseToken";
import { UserDetails } from "./interfaces/userDetailsProps";
import { yupResolver } from "@hookform/resolvers/yup";

export const EditUser = () => {
  const { parseToken } = useParseToken();

  const schema = yup.object().shape({
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
    address: yup.string().required("Address is required"),
    newPassword: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userData, set_userData] = useState<UserDetails>();
  const [newUserImg, set_newUserImg] = useState<File | null>(null);

  const updateUserFn = async (form: any) => {
    form.newPassword === "" && delete form.newPassword;

    console.log(form);
  };

  const userEffect = async () => {
    const user = await parseToken();
    set_userData(user);
  };
  useEffect(() => {
    userEffect();
  }, []);

  return (
    <div className="edit-user-container">
      <div className="basis-10/12">
        <div className="flex flex-wrap">
          <div className="md:basis-4/12 basis-full">
            <div className="p-img">
              <img
                src={
                  userData?.picture
                    ? require(`../../images/user/${userData?.picture}`)
                    : ""
                }
                alt="profile"
              />
            </div>
            <input
              className="img-input border"
              type="file"
              accept="image/*"
              onChange={(e) => {
                set_newUserImg(e.target.files ? e.target.files[0] : null);
              }}
            />
          </div>
          <div className="md:basis-8/12 basis-full md:px-10 max-md:mt-5">
            <form onSubmit={handleSubmit(updateUserFn)}>
              <input
                className="user-input"
                type="text"
                defaultValue={userData?.fname}
                placeholder="First name: ..."
                {...register("fname")}
              />
              <input
                className="user-input"
                type="text"
                defaultValue={userData?.lname}
                placeholder="Last name: ..."
                {...register("lname")}
              />
              <input
                className="user-input"
                type="text"
                defaultValue={userData?.address}
                placeholder="Address: ..."
                {...register("address")}
              />
              <input
                className="user-input"
                type="text"
                placeholder="New password: ..."
                {...register("newPassword")}
              />

              <button className="button cancel-btn" type="button">
                Cancel
              </button>
              <button className="button save-btn" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
