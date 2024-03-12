import React from "react";

function Balance({ value }) {
  console.log(value);
  return (
    <div className="flex items-center m-5 text-xl font-semibold">
      Your Balance: Rs {value}
    </div>
  );
}

export default Balance;
