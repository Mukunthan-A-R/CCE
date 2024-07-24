import React, { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
// import TableValues from "../data/Data";
import TableValues from "../data/DataChennai";
import { userValue, userCommunity } from "../data/atoms";
import InputComponentCast from "./InputComponentCast";
// import { Link } from "react-router-dom";
`import { useRecoilState } from "recoil";`
// import { FaServer } from "react-icons/fa";
import DataSubmitted from "./DataSubmitted";
// import Banner from "../assets/Banner.jpg";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

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
  const [userCaste, setUserCaste] = useRecoilState(userCommunity);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setUserData({
      ...userData,
      name: data.name,
      email: data.email,
      cutOff: data.cutOff,
    });
    setUserCaste({ community: data.cast });
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
    navigate("/home");
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

  // const handleDataClg = (value) => {
  //   setData((data) => ({
  //     ...data,
  //     clgName: value,
  //   }));
  // };

  // const handleDataName = (value) => {
  //   setData((data) => ({
  //     ...data,
  //     name: value,
  //   }));
  // };

  // const handleDataEmail = (value) => {
  //   setData((data) => ({
  //     ...data,
  //     email: value,
  //   }));
  // };

  // const handleDataCast = (value) => {
  //   setData((data) => ({
  //     ...data,
  //     cast: value,
  //   }));
  // };

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
    <div className="my-0">
      {showPopup && (
        <DataSubmitted handleClick={handleClosePopup}></DataSubmitted>
      )}
{/*     
      <div className="relative">
        <img src={Banner} className="w-full h-24 object-cover" />
        <h2 className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">TNEA CHOICE FILLING</h2>
      </div>
     */}
       
      {/* <div className="md:flex border border-gray-200 mx-10 rounded-lg my-5 shadow-lg">
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
      </div> */}
      {/* <div className="md:flex border border-gray-200 mx-10 rounded-lg my-5 shadow-lg"></div> */}
      <div className="border border-gray-200 rounded-lg mx-10 shadow-lg">
        {/* <div className="md:flex">
          <InputComponentCast
            // Cast
            sendData={handleDataCast}
            label="Community"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponentCast>
        </div> */}
        <div className="md:flex">
          <InputComponent
            //CutOff data
            sendData={handleDataCutOff}
            label="Cut Off Starting"
            type="number"
            styles="w-full md:w-1/2 px-10 my-4 "
          ></InputComponent>
          <InputComponent
            //CutOff data
            sendData={handleDataCutOff}
            label="Cut Off Ending"
            type="number"
            styles="w-full md:w-1/2 px-10 my-4 "
          ></InputComponent>
        </div>
          {/* <InputComponent
            // ClgName
            sendData={handleDataClg}
            label="College Name"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponent> */}
        <div className="md:flex">
          <InputComponent
            // Department
            sendData={handleDataDept}
            label="Department"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponent>
          <InputComponent
            // Region
            sendData={handleDataRegion}
            label="Region"
            type="text"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponent>
        </div>
        <div className="md:flex ">
        </div>
      
      </div>
      <div className="flex w-full justify-center">
        <ButtonComponent
          handleClick={handleSubmit}
          styles="mb-10 text-white bg-blue-700 px-5 py-2 mx-5 sm:mx-10 my-5 rounded-md flex justify-center " 
        >
          Submit
        </ButtonComponent>
  
      </div>
        
    </div>
  );
};

export default InputFilter;
