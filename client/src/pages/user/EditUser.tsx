import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

import { useParseToken } from "../../hooks/user/useParseToken";
import { UserDetails } from "./interfaces/userDetailsProps";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";
import { type } from "@testing-library/user-event/dist/types/setup/directApi";

export const EditUser = () => {
  const { id } = useParams();

  const { parseToken } = useParseToken();
  const { updateUser } = useUpdateUser(id);

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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userData, set_userData] = useState<UserDetails>();
  const [newUserImg, set_newUserImg] = useState<File | null>(null);
  const [previewUserImg, set_previewUserImg] = useState<String | undefined>("");

  const updateUserFn = async (form: any) => {
    form.newPassword === "" && delete form.newPassword;
    const userForm = new FormData();

    newUserImg && userForm.append("image", newUserImg);
    userForm.append("user", JSON.stringify(form));
    userForm.append("oldPic", JSON.stringify(userData?.picture));

    const response = await updateUser(userForm);

    response && window.location.assign("/user/profile");
  };

  const imageChangeFn = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      set_previewUserImg(previewUrl);
    } else {
      set_previewUserImg(userData?.picture);
    }

    set_newUserImg(e.target.files ? e.target.files[0] : null);
  };

  const userEffect = async () => {
    const user = await parseToken();

    set_userData(user);
    set_previewUserImg(user.picture);
    reset({
      fname: user.fname,
      lname: user.lname,
      address: user.address,
    });
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
                // src={
                //   typeof previewUserImg === "string"
                //     ? require(`../../images/user/${previewUserImg}`)
                //     : previewUserImg
                // }
                src={
                  previewUserImg
                    ? previewUserImg.startsWith("blob:")
                      ? previewUserImg
                      : require(`../../images/user/${previewUserImg}`)
                    : ""
                }
                alt="profile"
              />
            </div>
            <input
              className="img-input border"
              type="file"
              accept="image/*"
              onChange={imageChangeFn}
            />
          </div>
          <div className="md:basis-8/12 basis-full md:px-10 max-md:mt-5">
            <form onSubmit={handleSubmit(updateUserFn)}>
              <div>First name</div>
              <input
                className="user-input"
                type="text"
                defaultValue={userData?.fname}
                {...register("fname")}
              />
              <div className="errors">{errors.fname?.message}</div>

              <div>Last name</div>
              <input
                className="user-input"
                type="text"
                defaultValue={userData?.lname}
                {...register("lname")}
              />
              <div className="errors">{errors.lname?.message}</div>

              <div>Address</div>
              <input
                className="user-input"
                type="text"
                defaultValue={userData?.address}
                {...register("address")}
              />
              <div className="errors">{errors.address?.message}</div>

              <div>
                New password <i>(optional)</i>
              </div>
              <input
                className="user-input"
                type="password"
                {...register("newPassword")}
              />
              <div className="errors">{errors.newPassword?.message}</div>

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
