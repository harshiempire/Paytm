import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Appbar({ firstname }) {
  const navigate = useNavigate();
  console.log(firstname);
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          {firstname[0].toUpperCase() + firstname.slice(1)}
        </div>
        <div className="rounded-full h-12 w-12 bg-purple-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {firstname[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full mt-1 mr-2">
          <Button
            onClick={() => {
              localStorage.clear();
              navigate("/signin");
            }}
            label={"Log out"}
          />
        </div>
      </div>
    </div>
  );
}

export default Appbar;
