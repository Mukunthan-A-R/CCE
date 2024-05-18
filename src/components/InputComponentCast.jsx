import React, { useState } from "react";

const InputComponentCast = ({ label, type = "text", styles, sendData }) => {
  const handleChange = (event) => {
    sendData(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className={styles}>
      <label htmlFor={label} className="mx-2 text-lg font-medium">
        {label}
      </label>
      <br />
      <select
        id={label}
        onChange={handleChange}
        className="w-full border bg-[#deebfa] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      >
        <option value="">Select...</option>
        <option value="oc">OC</option>
        <option value="bc">BC</option>
        <option value="mbc">MBC</option>
        <option value="bcm">BCM</option>
      </select>
    </div>
  );
};

export default InputComponentCast;
