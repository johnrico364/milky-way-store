import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
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
  const [queryStatus, set_queryStatus] = useState("all");

  const blockUserFn = async (user_id: string) => {
    await blockUser(user_id);
    await userEffect();
  };

  const unblockUserFn = async (user_id: string) => {
    await unblockUser(user_id);
    await userEffect();
  };

  const userEffect = async () => {
    const allUsers = await getAllUsers(queryStatus);
    set_userAccounts(allUsers);
  };

  useEffect(() => {
    userEffect();
  }, [queryStatus]);

  return (
    <div className="admin-users-container">
      <div className="flex justify-end pe-5">
        <select
          className="dropdown mt-1"
          onChange={(e) => set_queryStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
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
              {queryStatus === "blocked" && <th>Blocked</th>}
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

              let blockDate = "";
              if (user.blockedAt) {
                blockDate = formatDistanceToNow(new Date(user.blockedAt), {
                  addSuffix: true,
                });
              }

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
                    {queryStatus === "all" && (
                      <button
                        className="button"
                        onClick={() => navigate(`transactions/${user._id}`)}
                      >
                        Transactions
                      </button>
                    )}
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
                          if (modal) modal.showModal();
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
                  {user.isBlocked && queryStatus === "blocked" && (
                    <td>{blockDate}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {userAccounts.length === 0 && (
          <div className="text-center text-2xl font-bold">
            No users found...
          </div>
        )}
      </div>
    </div>
  );
};
