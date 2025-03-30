import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useGetAllUsers } from "../../hooks/user/useGetAllUsers";
import { useState } from "react";

interface UserDetailsProps {
  fname: string;
  lname: string;
  email: string;
  picture: string;
  address: string;
  createdAt: string;
}

export const Users = () => {
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
                    <button className="button">Transactions</button>
                    <button
                      className="button"
                      onClick={() => console.log("object")}
                    >
                      Block
                    </button>
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
