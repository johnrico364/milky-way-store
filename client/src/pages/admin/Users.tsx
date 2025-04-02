import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useGetAllUsers } from "../../hooks/user/useGetUsers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserDetailsProps {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  picture: string;
  address: string;
  createdAt: string;
}

export const Users = () => {
  const navigate = useNavigate();
  const { getAllUsers } = useGetAllUsers();

  const [userAccounts, set_userAccounts] = useState([]);

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
                    <button className="button">Block</button>
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
