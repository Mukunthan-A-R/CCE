import React from "react";

const InputComponent = ({ label, type = "text", styles }) => {
  return (
    <div className={styles}>
      <label htmlFor={label} className="mx-2 text-lg font-medium">
        {label}
      </label>
      <br />
      <input
        id={label}
        className="w-full border bg-purple-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        type={type}
      />
    </div>
  );
};

export default InputComponent;
