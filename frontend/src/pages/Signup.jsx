import React from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="border border-gray-400 p-4 w-96 drop-shadow rounded">
        <h1 className="text-4xl font-bold text-center">Sign up</h1>
        <InputBox placeholder={"John"} label={"First Name"} />
        <InputBox placeholder={"Doe"} label={"Last Name"} />
        <InputBox placeholder={"Email"} label={"Email"} />
        <InputBox placeholder={"password"} label={"Password"} />
        <div className="my-2">
          <Button label={"Sign up"} />
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
