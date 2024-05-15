import React, { useState } from "react";
import InputFilter from "../components/InputFilter";
import CollegeList from "../components/CollegeList";
import TableWithSort from "../components/TableWithSort";
import InputTable from "../components/InputTable";
import InputForm from "../components/InputForm";

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
      name: "Anna University",
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
      name: "SRM Institute of Science and Technology",
      branchCode: "BC003",
      branchName: "Mechanical Engineering",
      oc: 20.25,
      bc: 30.1,
      bcm: 25.6,
      mbc: 35.9,
    },
    {
      sNo: 4,
      region: "West",
      collegeCode: "DEF321",
      name: "Vel Tech Rangarajan",
      branchCode: "BC004",
      branchName: "Civil Engineering",
      oc: 18.3,
      bc: 28.5,
      bcm: 22.4,
      mbc: 32.7,
    },
    {
      sNo: 5,
      region: "North",
      collegeCode: "MNO654",
      name: "Vellore Institute of Technology",
      branchCode: "BC005",
      branchName: "Chemical Engineering",
      oc: 22.1,
      bc: 35.2,
      bcm: 30.4,
      mbc: 40.2,
    },
    {
      sNo: 6,
      region: "South",
      collegeCode: "GHI987",
      name: "Sathyabama Institute of Science and Technology",
      branchCode: "BC006",
      branchName: "Aeronautical Engineering",
      oc: 17.8,
      bc: 27.3,
      bcm: 21.9,
      mbc: 31.5,
    },
    {
      sNo: 7,
      region: "East",
      collegeCode: "JKL321",
      name: "Hindustan Institute of Technology and Science",
      branchCode: "BC007",
      branchName: "Biomedical Engineering",
      oc: 19.6,
      bc: 31.8,
      bcm: 27.2,
      mbc: 36.4,
    },
    {
      sNo: 8,
      region: "West",
      collegeCode: "STU654",
      name: "Madras Institute of Technology",
      branchCode: "BC008",
      branchName: "Petroleum Engineering",
      oc: 21.4,
      bc: 33.6,
      bcm: 29.3,
      mbc: 38.7,
    },
    {
      sNo: 9,
      region: "North",
      collegeCode: "VWX987",
      name: "Saveetha Institute of Medical and Technical Sciences",
      branchCode: "BC009",
      branchName: "Environmental Engineering",
      oc: 16.9,
      bc: 26.4,
      bcm: 20.1,
      mbc: 29.8,
    },
    {
      sNo: 10,
      region: "South",
      collegeCode: "NOP456",
      name: "Bharath Institute of Higher Education and Research",
      branchCode: "BC010",
      branchName: "Industrial Engineering",
      oc: 23.2,
      bc: 36.8,
      bcm: 31.5,
      mbc: 42.1,
    },
    // Add more data as needed
  ];

  const [tableData, setTableData] = useState([]);

  const handleFormSubmit = (formData) => {
    // Update table data
    setTableData([...tableData, formData]);

    // Sort table data based on some criteria (e.g., S.No)
    const sortedData = [...tableData, formData].sort((a, b) => {
      // Sorting criteria (modify as per your requirement)
      return a.sNo - b.sNo;
    });

    setTableData(sortedData);
  };

  return (
    <div className="m-5 sm:m-10">
      <h2 className="text-center font-bold text-xl my-5">TNEA Choice Order </h2>
      <InputFilter sendDataObj={handleDataObj}></InputFilter>
      <TableWithSort data={data}></TableWithSort>
    </div>
  );
};

export default Home;
