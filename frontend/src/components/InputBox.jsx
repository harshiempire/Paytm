import React from "react";

function InputBox({ onChange,placeholder, label }) {
  return (
    <div>
      <div className="font-medium text-sm py-2">{label}</div>
      <input onChange={onChange}
        placeholder={placeholder}
        className="px-2 w-full py-1 border border-gray-300 rounded"
      />
    </div>
  );
}

export default InputBox;
