import React, { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
    });
    localStorage.setItem("token",res.data.token)
    navigate("/dashboard")
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="border border-gray-400 p-4 w-96 drop-shadow rounded">
        <h1 className="text-4xl font-bold text-center">Sign up</h1>
        <InputBox
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          placeholder={"John"}
          label={"First Name"}
        />
        <InputBox
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          placeholder={"Doe"}
          label={"Last Name"}
        />
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
          <Button onClick={handleSubmit} label={"Sign In"} />
        </div>
        <div className="text-sm text-center text-slate-400">
          Already have an account?{" "}
          <Link className="text-blue-500 underline" to={"/signin"}>
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
