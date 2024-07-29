import React, { useState } from "react";

const InputComponent = ({ label, type = "text", styles, sendData,error}) => {
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
        className="w-[500px] border bg-[#deebfa] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        type={type}
        
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputComponent;
