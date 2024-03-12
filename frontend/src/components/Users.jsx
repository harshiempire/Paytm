import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const AuthStr = "Bearer ".concat(localStorage?.getItem("token"));
  const [filter, setFilter] = useState([]);
  const [debouncedFilter, setDebouncedFilter] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300); // Adjust the delay time as needed

    return () => clearTimeout(delay);
  }, [filter]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + debouncedFilter, {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        setUsers(res.data.user);
      });
  }, [debouncedFilter]);

  return (
    <div className="mx-5">
      <div className="font-bold mt-6 text-lg mb-4">Users</div>
      <div className="my-2 mb-4">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div className="mb-4">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between ">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-purple-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full mx-4 text-lg font-semibold">
          {user.firstname.charAt(0).toUpperCase() +
            user.firstname.slice(1) +
            " " +
            user.lastname.charAt(0).toUpperCase() +
            user.lastname.slice(1)}
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstname);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}

export default Users;
