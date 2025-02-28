import { formatDistanceToNow, formatDate } from "date-fns";
import React from "react";

interface UserProps {
  data: {
    fname: string;
    lname: string;
    address: string;
    email: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
  };
  index: number;
}

export const UserDetailsCard: React.FC<UserProps> = ({ data, index }) => {
  const updateDate = formatDistanceToNow(new Date(data.updatedAt), {
    addSuffix: true,
  });

  return (
    <div className="flex flex-wrap">
      <div className="basis-4/12 pr-2">
        <img src={require(`../images/user/${data.picture}`)} alt="" />
      </div>
      <div className="basis-8/12">
        <div className="font-semibold ps-2"># {index}</div>
        <div>
          <span className="font-semibold">Name: </span>
          {data.lname}, {data.fname}
        </div>
        <div>
          <span className="font-semibold">Address: </span>
          {data.address}
        </div>
        <div>
          <span className="font-semibold">Email: </span>
          {data.email}
        </div>
        <div>
          <span className="font-semibold">Updated: </span>
          {updateDate}
        </div>
      </div>
    </div>
  );
};

export const UserDetailsTable: React.FC<UserProps> = ({ data, index }) => {
  const createDate = formatDate(new Date(data.createdAt), "MMM dd, yyyy");

  return (
    <tr className="hover">
      <th>{index}</th>
      <td>
        <img
          src={require(`../images/user/${data?.picture}`)}
          alt="profile"
          width={50}
        />
      </td>
      <td>
        {data?.fname} {data?.lname}
      </td>
      <td>{data?.email}</td>
      <td>{data?.address}</td>
      <td>{createDate}</td>
    </tr>
  );
};
