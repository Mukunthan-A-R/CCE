import React, { useState } from "react";

const InputComponent = ({ label, type = "text", styles, sendData, placeholder }) => {
  const handleChange = (event) => {
    sendData(event.target.value);
  };

  return (
    <div className={styles}>
      <label htmlFor={label} className="mx-2 text-lg font-medium">
        {label}
      </label>
      <br />
      <input
        onChange={handleChange}
        id={label}
        className="w-full border bg-[#deebfa] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputComponent;
