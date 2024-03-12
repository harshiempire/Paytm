import React, { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
      username: username,
      password: password,
    });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-gray-400 p-4 w-96 drop-shadow rounded">
        <h1 className="text-4xl font-bold text-center">Sign in</h1>
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder={"Email"}
          label={"Email"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={"Password"}
          label={"Password"}
        />
        <div className="my-2">
          <Button onClick={handleSubmit} label={"Sign up"} />
        </div>
        <div className="text-sm text-center text-slate-400">
          Don't have an account? Create an account{" "}
          <Link
            className="text-blue-500 pointer cursor-pointer underline"
            to={"/signup"}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
