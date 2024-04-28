import React, { useState } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";

const InputFilter = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    clgName: "",
    dept: "",
    cutOff: 0,
    cast: "",
    region: "",
  });

  const handleSubmit = () => {
    console.log("Hello");
    console.log(data);
  };
  const handleDataCutOff = (value) => {
    setData((data) => ({
      ...data,
      cutOff: value,
    }));
    console.log(data);
  };
  return (
    <div className="my-10">
      <div className="md:flex">
        <InputComponent
          label="Name"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
        <InputComponent
          label="Email"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
      </div>
      <div className="md:flex">
        <InputComponent
          label="College Name"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
        <InputComponent
          label="Department"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
      </div>
      <div className="md:flex">
        <InputComponent
          //hello changed here
          sendData={handleDataCutOff}
          label="Cut Off"
          type="number"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
        <InputComponent
          label="Cast"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
      </div>
      <div className="md:flex">
        <InputComponent
          label="Region"
          type="number"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
        <InputComponent
          label="Department"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
      </div>
      <ButtonComponent
        handleClick={handleSubmit}
        styles="text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-5 py-2 mx-5 sm:mx-10 my-2 rounded-md"
      >
        Submit
      </ButtonComponent>
    </div>
  );
};

export default InputFilter;
