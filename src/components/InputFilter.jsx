import React, { useState } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import TableWithSort from "./TableWithSort";
import TableValues from "../data/Data";
import InputComponentCast from "./InputComponentCast";

const InputFilter = () => {
  const [listValue, setListValue] = useState(TableValues);
  const [data, setData] = useState({
    name: "",
    email: "",
    clgName: "",
    dept: "",
    cutOff: 0,
    cast: "",
    region: "",
  });
  console.log(data);

  const handleSubmit = () => {
    setListValue(
      TableValues.filter(
        (item) =>
          // filter with college Name
          item.name.toLowerCase().startsWith(data.clgName.toLowerCase()) &&
          // filter with region
          item.region.toLowerCase().startsWith(data.region.toLowerCase()) &&
          // filter with filter
          item[data.cast] <= data.cutOff
      )
    );
    console.log(listValue);
  };

  const handleDataCutOff = (value) => {
    setData((data) => ({
      ...data,
      cutOff: value,
    }));
  };

  const handleDataDept = (value) => {
    setData((data) => ({
      ...data,
      dept: value,
    }));
  };

  const handleDataClg = (value) => {
    setData((data) => ({
      ...data,
      clgName: value,
    }));
  };

  const handleDataName = (value) => {
    setData((data) => ({
      ...data,
      name: value,
    }));
  };

  const handleDataEmail = (value) => {
    setData((data) => ({
      ...data,
      email: value,
    }));
  };

  const handleDataCast = (value) => {
    setData((data) => ({
      ...data,
      cast: value,
    }));
  };

  const handleDataRegion = (value) => {
    setData((data) => ({
      ...data,
      region: value,
    }));
  };

  return (
    <div className="my-10">
      <div className="md:flex">
        <InputComponent
          // Name
          sendData={handleDataName}
          label="Name"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
        <InputComponent
          // Email
          sendData={handleDataEmail}
          label="Email"
          type="email"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
      </div>
      <div className="md:flex">
        <InputComponent
          // ClgName
          sendData={handleDataClg}
          label="College Name"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
        <InputComponent
          // Department
          sendData={handleDataDept}
          label="Department"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
      </div>
      <div className="md:flex">
        <InputComponent
          //CutOff data
          sendData={handleDataCutOff}
          label="Cut Off"
          type="number"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
        <InputComponentCast
          // Cast
          sendData={handleDataCast}
          label="Cast"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponentCast>
      </div>
      <div className="md:flex">
        <InputComponent
          // Region

          sendData={handleDataRegion}
          label="Region"
          type="text"
          styles="w-full md:w-1/2 px-10 my-4"
        ></InputComponent>
      </div>
      <ButtonComponent
        handleClick={handleSubmit}
        styles="mb-10 text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-5 py-2 mx-5 sm:mx-10 my-2 rounded-md"
      >
        Submit
      </ButtonComponent>
      <TableWithSort data={listValue}></TableWithSort>
    </div>
  );
};

export default InputFilter;
