import React, { useState } from "react";
import InputFilter from "../components/InputFilter";
import CollegeList from "../components/CollegeList";
import TableWithSort from "../components/TableWithSort";

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

  const data = [
    {
      sNo: 1,
      region: "North",
      collegeCode: "XYZ123",
      name: "Anna University",
      branchCode: "BC001",
      branchName: "Computer Science",
      oc: 10.5,
      bc: 20.75,
      bcm: 15.25,
      mbc: 25.3,
    },
    {
      sNo: 2,
      region: "South",
      collegeCode: "ABC456",
      name: "MIT Chennai",
      branchCode: "BC002",
      branchName: "Electrical Engineering",
      oc: 15.75,
      bc: 25.2,
      bcm: 20.8,
      mbc: 30.6,
    },
    {
      sNo: 3,
      region: "East",
      collegeCode: "PQR789",
      name: "VIT chennai",
      branchCode: "BC003",
      branchName: "Mechanical Engineering",
      oc: 20.25,
      bc: 30.1,
      bcm: 25.6,
      mbc: 35.9,
    },
    // Add more sample data as needed
  ];

  return (
    <div className="my-5">
      <h2 className="text-center font-bold text-xl my-5">TNEA Choice Order </h2>
      <InputFilter sendDataObj={handleDataObj}></InputFilter>
      {/* <CollegeList filterData={filterData}></CollegeList> */}

      <TableWithSort data={data}></TableWithSort>
    </div>
  );
};

export default Home;
