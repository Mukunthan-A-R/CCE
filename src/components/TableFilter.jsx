import React, { useEffect, useState } from "react";
import TableValues from "../data/DataChennai";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import { userData } from "../data/atoms";
import TableWithSort from "./TableWithSort";
import InputRegion from "./InputRegion";
import InputDept from "./InputDept";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

const TableFilter = () => {
  const { community } = useRecoilValue(userData);
  const [data, setData] = useState([...TableValues]);
  const [TableValuesCopy, setTableValuesCopy] = useState([...TableValues]);
  const [filter, setFilter] = useState({
    cutOffStart: 200,
    cutOffEnd: 0,
    collegeCode: 0,
    region: "",
    dept: [],
  });

  console.log(JSON.stringify(data[0]));
  const [errors, SetErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  const handleDataCutOffSt = (value) => {
    let newErrors = {};
    if (value > 0 && value <= 200) {
      setFilter({ ...filter, cutOffStart: parseFloat(value) });
      newErrors.cutOffStart = "";
    } else if (value === "") {
      setFilter({ ...filter, cutOffStart: 200 });
    } else {
      newErrors.cutOffStart =
        "Cut off value starting should be between 1 and 200";
    }
    SetErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const handleDataCutOffEnd = (value) => {
    let newErrors = {};
    if (value > 0 && value <= 200) {
      setFilter({ ...filter, cutOffEnd: parseFloat(value) });
      newErrors.cutOffEnd = "";
    } else {
      newErrors.cutOffEnd = "the cut off value should be between 1 and 200";
    }
    SetErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const handleDataCollegeCode = (value) => {
    const intValue = parseInt(value);
    let newErrors = {};
    if (value === "") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        collegeCode: 0,
      }));
      newErrors.collegeCode = "";
    } else if (isNaN(intValue)) {
      newErrors.collegeCode = "College Code must be a number";
    } else if (intValue <= 0 || intValue > 3000) {
      newErrors.collegeCode = "The college code should be between 1 and 3000";
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        collegeCode: intValue,
      }));
      newErrors.collegeCode = "";
    }
    SetErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));
  };

  const handleDataRegion = (e) => {
    setFilter({ ...filter, region: e.target.value });
  };

  const handleDataDept = (selectedValues) => {
    setFilter((prevFilter) => ({ ...prevFilter, dept: selectedValues }));
  };

  // useEffect(() => {
  //   console.log("Updated filter state:", filter);
  // }, [filter]);

  const handleSubmit = () => {
    const hasErrors = Object.values(errors).some(
      (error) => error.trim() !== ""
    );
    if (hasErrors) {
      console.log("Form Contains errors");
      return;
    }

    const FilterData = TableValues.filter(
      (value) =>
        value[community] <= filter.cutOffStart &&
        value[community] >= filter.cutOffEnd &&
        (filter.region === "" ||
          value.region.toLowerCase() === filter.region.toLowerCase())
    );

    let filteredData = FilterData;
    if (filter.collegeCode !== 0) {
      filteredData = filteredData.filter(
        (value) => filter.collegeCode === parseInt(value.collegeCode)
      );
    }
    if (filter.dept.length !== 0) {
      filteredData = filteredData.filter((value) =>
        filter.dept.includes(value.branchCode)
      );
    }
    setData(filteredData);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log(data.length);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginationGroup = Math.ceil(currentPage / 3);
  const startPage = (paginationGroup - 1) * 3 + 1;
  const endPage = Math.min(startPage + 2, totalPages);

  return (
    <div className="my-0">
      <div className="border border-gray-200 rounded-lg mx-10 shadow-lg">
        {/* <div className="md:flex">
          <InputComponent
            sendData={handleDataCutOffSt}
            label="Cut Off Starting"
            error={errors.cutOffStart}
            type="number"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponent>
          <InputComponent
            sendData={handleDataCutOffEnd}
            label="Cut Off Ending"
            type="number"
            styles="w-full md:w-1/2 px-10 my-4"
            error={errors.cutOffEnd}
          ></InputComponent>
        </div> */}
        <div className="md:flex">
          <InputComponent
            sendData={handleDataCollegeCode}
            label="College Code"
            error={errors.collegeCode}
            type="number"
            styles="w-full md:w-1/2 px-10 my-4"
          ></InputComponent>
          <InputRegion
            label="Region"
            styles="w-full md:w-1/2 px-10 my-4"
            sendData={handleDataRegion}
          ></InputRegion>
        </div>
        <InputDept
          label="Department"
          styles="w-full md:w-1/2 px-10 my-4"
          sendData={handleDataDept}
        />
      </div>
      <div className="flex w-full justify-center">
        <ButtonComponent
          handleClick={handleSubmit}
          styles="mb-10 text-white bg-blue-700 px-5 py-2 mx-5 sm:mx-10 my-5 rounded-md flex justify-center"
        >
          Submit
        </ButtonComponent>
        <Link to="/result">
          <ButtonComponent
            // handleClick={handleSubmit}
            styles="mb-10 text-white bg-blue-700 px-5 py-2 mx-5 sm:mx-10 my-5 rounded-md flex justify-center"
          >
            Confirm Choices
          </ButtonComponent>
        </Link>
      </div>
      <TableWithSort
        tableWithSort
        data={paginatedData}
        community={community}
      ></TableWithSort>
      <div className="flex justify-center my-4">
        <button
          onClick={handlePrevPage}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400"
              : "bg-blue-700 text-white"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === startPage + index
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {startPage + index}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400"
              : "bg-blue-700 text-white"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableFilter;
