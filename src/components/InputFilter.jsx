import React, { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import TableWithSort from "./TableWithSort";
import TableValues from "../data/Data";
import { userValue, userCommunity } from "../data/atoms";
import InputComponentCast from "./InputComponentCast";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { FaServer } from "react-icons/fa";
import DataSubmitted from "./DataSubmitted";

const InputFilter = () => {
  const [listValue, setListValue] = useState(TableValues);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    clgName: "",
    dept: "",
    cutOff: 200,
    cast: "",
    region: "",
  });
  const [userData, setUserData] = useRecoilState(userValue);
  const [userCast, setUserCast] = useRecoilState(userCommunity);
  // console.log(data);
  // console.log(TableValues);

  const handleSubmit = () => {
    setUserData({ ...userData, name: data.name, email: data.email });
    setUserCast({ community: data.cast });
    const DataFilter = TableValues.filter(
      (item) =>
        // filter with college Name
        item.name.toLowerCase().includes(data.clgName.toLowerCase()) &&
        // filter with region
        item.region.toLowerCase().startsWith(data.region.toLowerCase()) &&
        // filter with department
        item.branchName.toLowerCase().includes(data.dept.toLowerCase())
      // filter with filter
      // item[data.cast] <= data.cutOff
    );
    const finalData = DataFilter;
    setListValue(DataFilter);
    // Filter by Cut Off
    if (data.cast !== "") {
      setListValue(finalData.filter((item) => item[data.cast] <= data.cutOff));
    }
    // console.log(listValue);
    // console.log(DataFilter);
    setShowPopup(true);
    console.log(data);
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

  // Function to handle closing the popup
  const handleClosePopup = () => {
    // Set showPopup to false to hide the popup
    setShowPopup(false);
  };

  useEffect(() => {
    // Close the popup after 3 seconds
    const timeoutId = setTimeout(() => {
      handleClosePopup();
    }, 1000);

    // Cleanup the timeout when component unmounts or when showPopup changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showPopup]);

  return (
    <div className="my-10">
      {showPopup && (
        <DataSubmitted handleClick={handleClosePopup}></DataSubmitted>
      )}
      <h2 className="text-center font-bold text-xl my-5">TNEA Choice Order </h2>
      <Link to="/app">
        <div className="mx-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2">
          <FaServer />
        </div>
      </Link>
      <div className="md:flex border border-gray-200 mx-10 rounded-lg my-5 shadow-lg">
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
      {/* <div className="md:flex border border-gray-200 mx-10 rounded-lg my-5 shadow-lg"></div> */}
      <div className="border border-gray-200 rounded-lg mx-10 shadow-lg">
        <div className="md:flex">
          <InputComponentCast
            // Cast
            sendData={handleDataCast}
            label="Community"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponentCast>
          <InputComponent
            //CutOff data
            sendData={handleDataCutOff}
            label="Cut Off"
            type="number"
            styles="w-full md:w-1/2 px-10 my-4 "
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
            // Region
            sendData={handleDataRegion}
            label="Region"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponent>
        </div>
      </div>

      <ButtonComponent
        handleClick={handleSubmit}
        styles="mb-10 text-white bg-blue-700 px-5 py-2 mx-5 sm:mx-10 my-5 rounded-md"
      >
        Submit
      </ButtonComponent>
      <TableWithSort data={listValue} community={data.cast}></TableWithSort>
    </div>
  );
};

export default InputFilter;
