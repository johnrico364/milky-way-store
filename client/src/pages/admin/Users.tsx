import { useQuery } from "@tanstack/react-query";
import {
  UserDetailsCard,
  UserDetailsTable,
} from "../../components/UserDetails";
import { useGetAllUsers } from "../../hooks/user/useGetAllUsers";
import { useState } from "react";

export const Users = () => {
  const { getAllUsers } = useGetAllUsers();

  const [userAccounts, set_userAccounts] = useState([]);

  const effectFn = async () => {
    const allUsers = await getAllUsers();
    set_userAccounts(allUsers);
  };

  useQuery({
    queryKey: ["profile", "admin"],
    queryFn: effectFn,
  });

  return (
    <div className="admin-users-container">
      <div className="lg:basis-9/12 basis-11/12 pt-6">
        <div className="lg:hidden block">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 text-sm">
            {userAccounts.map((user: any, index: number) => {
              return (
                <div className="flex flex-wrap data-card">
                  <div className="basis-10/12">
                    <UserDetailsCard data={user} index={index + 1} />
                  </div>
                  <div className="basis-2/12">
                    <div className="flex">
                      <button className="action-btn">Edit</button>
                      <button className="action-btn">Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:block hidden">
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
                </tr>
              </thead>
              <tbody>
                {userAccounts.map((user: any, index: number) => {
                  return <UserDetailsTable data={user} index={index + 1} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
