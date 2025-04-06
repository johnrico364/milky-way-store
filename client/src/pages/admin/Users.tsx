import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetAllUsers } from "../../hooks/user/useGetUsers";
import { UserDetailsProps } from "./interfaces/userDetailsProps";
import { useBlockUser } from "../../hooks/user/useBlockUser";
import { useUnblockUser } from "../../hooks/user/useUnblockUser";

export const Users = () => {
  const navigate = useNavigate();

  const { getAllUsers } = useGetAllUsers();
  const { blockUser } = useBlockUser();
  const { unblockUser } = useUnblockUser();

  const [userAccounts, set_userAccounts] = useState([]);

  const blockUserFn = async (user_id: string) => {
    await blockUser(user_id);
    await userEffect();
  };

  const unblockUserFn = async (user_id: string) => {
    await unblockUser(user_id);
    await userEffect();
  };

  const userEffect = async () => {
    const allUsers = await getAllUsers();
    set_userAccounts(allUsers);
  };

  useQuery({
    queryKey: ["profile", "admin"],
    queryFn: userEffect,
  });

  return (
    <div className="admin-users-container">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userAccounts.map((user: UserDetailsProps, i) => {
              const createdDate = formatDistanceToNow(
                new Date(user.createdAt),
                {
                  addSuffix: true,
                }
              );
              return (
                <tr>
                  <th>{i + 1}</th>
                  <td>
                    <div className="profile-image">
                      <img
                        src={
                          user?.picture &&
                          require(`../../images/user/${user.picture}`)
                        }
                        alt="profile"
                      />
                    </div>
                  </td>
                  <td>
                    {user.fname} {user.lname}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{createdDate}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => navigate(`transactions/${user._id}`)}
                    >
                      Transactions
                    </button>

                    {user.isBlocked ? (
                      <button
                        className="unblock-button "
                        onClick={() => unblockUserFn(user._id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="button"
                        onClick={() => {
                          const modal = document.getElementById(
                            `my_modal_${i}`
                          ) as HTMLDialogElement | null;
                          if (modal) {
                            modal.showModal();
                          }
                        }}
                      >
                        Block
                      </button>
                    )}

                    <dialog
                      id={`my_modal_${i}`}
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirmation</h3>
                        <p className="py-4">
                          You sure you want to block {user.fname} {user.lname}?
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="flex">
                              <button className="button mr-1">Close</button>
                              <button
                                className="button"
                                onClick={() => blockUserFn(user._id)}
                              >
                                Confirm
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
