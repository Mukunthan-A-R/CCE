import React, { useState } from "react";
import InputFilter from "../components/InputFilter";
import CollegeList from "../components/CollegeList";

const Home = () => {
  const [filterData, setFilterData] = useState({
    name: "",
    email: "",
    clgName: "",
    dept: "",
    cutOff: 0,
    cast: "",
    region: "",
  });
  const handleDataObj = (data) => {
    console.log("parent Data" + data);
    setFilterData(data);
    console.log(data);
    console.log(filterData);
  };
  return (
    <div className="my-5">
      <h2 className="text-center font-bold text-xl my-5">TNEA Choice Order </h2>
      <InputFilter sendDataObj={handleDataObj}></InputFilter>
      <CollegeList filterData={filterData}></CollegeList>
    </div>
  );
};

export default Home;
